//! App state and input handling. No browser or terminal specifics here, so the same
//! code can sit behind Ratzilla (web) now and an SSH server later.

use ratzilla::ratatui::layout::{Position, Rect};

use crate::content::{CREDITS, JOBS, SKILLS};

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum View {
    Experience,
    Credits,
    Skills,
    About,
}

impl View {
    pub const ALL: [View; 4] = [View::Experience, View::Credits, View::Skills, View::About];

    pub fn name(self) -> &'static str {
        match self {
            View::Experience => "experience",
            View::Credits => "credits",
            View::Skills => "skills",
            View::About => "about",
        }
    }

    /// The scope shown in the frame title, like a k9s namespace.
    pub fn scope(self) -> &'static str {
        match self {
            View::Experience | View::Skills => "all",
            View::Credits => "shipped",
            View::About => "jim",
        }
    }

    pub fn len(self) -> usize {
        match self {
            View::Experience => JOBS.len(),
            View::Credits => CREDITS.len(),
            View::Skills => SKILLS.len(),
            View::About => 1,
        }
    }

    /// Stable id of row `i`, shown in the describe title and crumbs.
    pub fn id(self, i: usize) -> &'static str {
        match self {
            View::Experience => JOBS[i].slug,
            View::Credits => CREDITS[i].slug,
            View::Skills => SKILLS[i].id,
            View::About => "jim",
        }
    }
}

/// Something the user can trigger, by key or by clicking a hit region.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum Action {
    Show(View),
    Open(usize),
    Describe,
    Back,
    Up,
    Down,
    Top,
    Bottom,
    /// Open an external URL. The backend does the opening; the app state doesn't change.
    Link(&'static str),
}

/// Keys the app understands, mapped from whichever backend is running it.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum Key {
    Char(char),
    Up,
    Down,
    PageUp,
    PageDown,
    Home,
    End,
    Enter,
    Esc,
    Backspace,
}

pub struct App {
    pub view: View,
    sel: [usize; 4],
    describing: bool,
    /// First visible line of the describe view, and the most it can scroll.
    pub scroll: u16,
    pub max_scroll: u16,
    /// Lines that fit in the describe view; used for page up/down.
    pub page: u16,
    /// Clickable regions, rebuilt on every draw.
    pub hits: Vec<(Rect, Action)>,
    /// Grid cell under the mouse, for hover highlights.
    pub hover: Option<Position>,
    /// Current date as a fractional year (e.g. 2026.83), for tenure.
    pub now: f64,
}

impl App {
    pub fn new(now: f64) -> Self {
        Self {
            view: View::Experience,
            // Experience opens on Epic Games: the newest role (2K) has no highlights yet.
            sel: [1, 0, 0, 0],
            describing: false,
            scroll: 0,
            max_scroll: 0,
            page: 10,
            hits: Vec::new(),
            hover: None,
            now,
        }
    }

    pub fn selected(&self) -> usize {
        self.sel[self.view as usize]
    }

    /// About has a single item, so it always shows its describe view.
    pub fn describing(&self) -> bool {
        self.describing || self.view == View::About
    }

    pub fn apply(&mut self, action: Action) {
        let n = self.view.len();
        let i = self.view as usize;
        match action {
            Action::Show(v) => {
                self.view = v;
                self.describing = false;
                self.scroll = 0;
            }
            Action::Open(row) => {
                self.sel[i] = row.min(n - 1);
                self.describing = true;
                self.scroll = 0;
            }
            Action::Describe => {
                self.describing = true;
                self.scroll = 0;
            }
            Action::Back => {
                self.describing = false;
                self.scroll = 0;
            }
            Action::Up if self.describing() => self.scroll = self.scroll.saturating_sub(1),
            // Not clamped here: keys can arrive before the next draw recomputes max_scroll. draw() clamps.
            Action::Down if self.describing() => self.scroll = self.scroll.saturating_add(1),
            Action::Top if self.describing() => self.scroll = 0,
            Action::Bottom if self.describing() => self.scroll = u16::MAX,
            Action::Up => self.sel[i] = self.sel[i].saturating_sub(1),
            Action::Down => self.sel[i] = (self.sel[i] + 1).min(n - 1),
            Action::Top => self.sel[i] = 0,
            Action::Bottom => self.sel[i] = n - 1,
            Action::Link(_) => {}
        }
    }

    pub fn key(&mut self, key: Key) {
        let action = match key {
            Key::Char(c @ '1'..='4') => Action::Show(View::ALL[c as usize - '1' as usize]),
            Key::Char('j') | Key::Down => Action::Down,
            Key::Char('k') | Key::Up => Action::Up,
            Key::Char('g') | Key::Home => Action::Top,
            Key::Char('G') | Key::End => Action::Bottom,
            Key::Char('d') | Key::Enter => Action::Describe,
            Key::Esc | Key::Backspace | Key::Char('q') => Action::Back,
            Key::PageDown | Key::Char(' ') => {
                for _ in 0..self.page.max(1) {
                    self.apply(Action::Down);
                }
                return;
            }
            Key::PageUp => {
                for _ in 0..self.page.max(1) {
                    self.apply(Action::Up);
                }
                return;
            }
            Key::Char(_) => return,
        };
        self.apply(action);
    }

    /// Handles a click. Returns a URL when the click landed on a link, for the backend to open.
    pub fn click(&mut self, at: Position) -> Option<&'static str> {
        let action = self.hits.iter().rev().find(|(r, _)| r.contains(at)).map(|&(_, a)| a)?;
        if let Action::Link(url) = action {
            return Some(url);
        }
        self.apply(action);
        None
    }

    /// Whether the mouse is over a clickable region (for a pointer cursor).
    pub fn over_hit(&self) -> bool {
        self.hover.is_some_and(|p| self.hits.iter().any(|(r, _)| r.contains(p)))
    }
}

/// Tenure of a period like "2022 – Jun 2026" or "Jun 2026 – present", k9s AGE style: "4y", "5mo".
pub fn age(period: &str, now: f64) -> String {
    let mut parts = period.split('–').map(str::trim);
    let start = parts.next().unwrap_or("");
    let end = parts.next().unwrap_or(start);
    let years = (point(end, now, true) - point(start, now, false)).max(0.0);
    if years < 1.0 {
        format!("{}mo", (years * 12.0).round() as i32)
    } else {
        format!("{}y", years.round() as i32)
    }
}

fn point(s: &str, now: f64, end: bool) -> f64 {
    if s.eq_ignore_ascii_case("present") {
        return now;
    }
    const MONTHS: [&str; 12] = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let year = s.split_whitespace().find_map(|w| w.parse::<f64>().ok()).unwrap_or(0.0);
    let month = s
        .split_whitespace()
        .find_map(|w| MONTHS.iter().position(|m| w.to_ascii_lowercase().starts_with(m)));
    match month {
        Some(m) => year + m as f64 / 12.0,
        None if end => year + 1.0,
        None => year,
    }
}

/// Employers whose job highlights mention `tool` as a whole word (case-insensitive).
pub fn used_at(tool: &str) -> Vec<&'static str> {
    let needle = tool.to_lowercase();
    let mut out: Vec<&'static str> = Vec::new();
    for job in JOBS {
        let hit = job.details.iter().any(|d| contains_word(&d.to_lowercase(), &needle));
        let company = job.company.split(" / ").next().unwrap_or(job.company);
        if hit && !out.contains(&company) {
            out.push(company);
        }
    }
    out
}

fn contains_word(hay: &str, needle: &str) -> bool {
    let bytes = hay.as_bytes();
    hay.match_indices(needle).any(|(i, m)| {
        let before = i == 0 || !bytes[i - 1].is_ascii_alphanumeric();
        let j = i + m.len();
        let after = j >= bytes.len() || !bytes[j].is_ascii_alphanumeric();
        before && after
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ages() {
        let now = 2026.0 + 10.0 / 12.0;
        assert_eq!(age("2022 – Jun 2026", now), "4y");
        assert_eq!(age("Jun 2026 – present", now), "5mo");
        assert_eq!(age("2022", now), "1y");
        assert_eq!(age("2008 – 2015", now), "8y");
    }

    #[test]
    fn mentions() {
        assert_eq!(used_at("Terraform"), vec!["Epic Games", "Electronic Arts"]);
        assert!(used_at("Go").is_empty(), "no false hits inside words like 'GitOps'");
    }
}
