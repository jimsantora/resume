//! Rendering, k9s-style: info + hotkeys + logo header, one framed resource table with its title
//! set in the border, a YAML-ish describe view, and crumbs along the bottom.

use ratzilla::ratatui::{
    layout::{Constraint, Layout, Margin, Rect},
    style::{Color, Style, Stylize},
    text::{Line, Span},
    widgets::{Block, Cell, Paragraph, Row, Table, TableState},
    Frame,
};

use tui_big_text::{BigText, PixelSize};

use crate::app::{age, used_at, Action, App, View};
use crate::covers;
use crate::content::{ABOUT, CREDITS, EMPLOYERS, GITHUB, JOBS, LINKEDIN, PROFILE, SKILLS, SPECIALTIES};

/// k9s default skin.
mod skin {
    use super::Color;
    pub const BG: Color = Color::Rgb(0, 0, 0);
    pub const FG: Color = Color::Rgb(0xe8, 0xe8, 0xe8);
    pub const DIM: Color = Color::Rgb(0x6c, 0x6c, 0x6c);
    pub const ORANGE: Color = Color::Rgb(0xff, 0xa5, 0x00);
    pub const DODGER: Color = Color::Rgb(0x1e, 0x90, 0xff);
    pub const AQUA: Color = Color::Rgb(0x00, 0xff, 0xff);
    pub const FUCHSIA: Color = Color::Rgb(0xff, 0x00, 0xff);
    pub const PAPAYA: Color = Color::Rgb(0xff, 0xef, 0xd5);
    pub const STEEL: Color = Color::Rgb(0x6c, 0xa6, 0xe0);
    pub const HOVER: Color = Color::Rgb(0x0f, 0x2a, 0x33);
}

/// How a URL is shown: without the scheme or "www.", e.g. `github.com/jimsantora`.
fn display_url(url: &'static str) -> &'static str {
    let s = url.strip_prefix("https://").unwrap_or(url);
    s.strip_prefix("www.").unwrap_or(s)
}

/// "Jim Santora" drawn with tui-big-text in quadrant pixels: 4 columns x 4 rows per letter.
const NAME_W: u16 = 44;
const NAME_H: u16 = 4;
/// Two hotkey columns of 17 plus a 3-column gap.
const MENU_W: u16 = 37;
const INFO_W: u16 = 46;

#[derive(Clone, Copy, PartialEq, Eq)]
enum HeaderMode {
    /// Window too short: no header at all.
    Hidden,
    /// Phone width: a few info lines and one row of view keys.
    Compact,
    /// Medium width: big name on its own band above info + hotkeys.
    Stacked,
    /// Wide: info, hotkeys and big name side by side, like k9s.
    Wide,
}

pub fn draw(f: &mut Frame, app: &mut App) {
    app.hits.clear();
    let full = f.area();
    f.render_widget(Block::new().bg(skin::BG), full);

    // Breathing room around the whole UI, except on very small screens.
    let area = if full.width >= 60 && full.height >= 20 { full.inner(Margin::new(2, 1)) } else { full };

    let mode = match (area.width, area.height) {
        (_, h) if h < 24 => HeaderMode::Hidden,
        (w, _) if w < 72 => HeaderMode::Compact,
        (w, h) if w < INFO_W + 4 + MENU_W + 4 + NAME_W && h >= 34 => HeaderMode::Stacked,
        (w, _) if w < INFO_W + 4 + MENU_W + 4 + NAME_W => HeaderMode::Compact,
        _ => HeaderMode::Wide,
    };
    let header_h = match mode {
        HeaderMode::Hidden => 0,
        HeaderMode::Compact => 5,
        HeaderMode::Stacked => NAME_H + 1 + 6,
        HeaderMode::Wide => 6,
    };
    let gap = u16::from(header_h > 0);
    let [header, _, main, crumbs] = Layout::vertical([
        Constraint::Length(header_h),
        Constraint::Length(gap),
        Constraint::Min(4),
        Constraint::Length(1),
    ])
    .areas(area);

    if mode != HeaderMode::Hidden {
        draw_header(f, app, header, mode);
    }
    if app.describing() {
        draw_describe(f, app, main);
    } else if app.view == View::Credits && main.width >= 90 {
        // Credits: table plus a cover panel that follows the hovered (or selected) row.
        let cover_w = (cover_size(main.height.saturating_sub(6), u16::MAX).0 + 4).max(30);
        let [table_a, cover_a] =
            Layout::horizontal([Constraint::Min(40), Constraint::Length(cover_w)]).areas(main);
        let shown = draw_table(f, app, table_a);
        draw_cover_panel(f, app, cover_a, shown);
    } else {
        draw_table(f, app, main);
    }
    draw_crumbs(f, app, crumbs);
}

fn big_name() -> BigText<'static> {
    BigText::builder()
        .pixel_size(PixelSize::Quadrant)
        .style(Style::new().fg(skin::ORANGE))
        .lines(vec![Line::from(PROFILE.name)])
        .build()
}

// ---------------------------------------------------------------- header

fn draw_header(f: &mut Frame, app: &mut App, area: Rect, mode: HeaderMode) {
    let compact = mode == HeaderMode::Compact;
    let mut area = area;
    if mode == HeaderMode::Stacked {
        f.render_widget(big_name(), Rect::new(area.x, area.y, NAME_W.min(area.width), NAME_H));
        area = Rect { y: area.y + NAME_H + 1, height: area.height - NAME_H - 1, ..area };
    }

    let career = format!(
        "{}y · {} roles · {} shipped games",
        (app.now - 2001.0).round() as i32,
        JOBS.len(),
        CREDITS.len()
    );
    let label = |k: &str| Span::styled(format!("{k:<10}"), Style::new().fg(skin::ORANGE));
    let val = |v: String| Span::styled(v, Style::new().fg(skin::FG).bold());
    let link = |u: &'static str| Span::styled(display_url(u), Style::new().fg(skin::FG).underlined());

    // The big name replaces the Name: line except on phones.
    let mut info = Vec::new();
    if compact {
        info.push(Line::from(vec![label("Name:"), val(PROFILE.name.into())]));
    }
    info.push(Line::from(vec![label("Role:"), val(PROFILE.title.into())]));
    if !compact {
        info.push(Line::from(vec![label("Focus:"), val(PROFILE.discipline.into())]));
    }
    info.push(Line::from(vec![label("Now:"), val(JOBS[0].company.into())]));
    if !compact {
        info.push(Line::from(vec![label("Career:"), val(career)]));
    }
    let mut links = vec![(info.len() as u16, GITHUB)];
    info.push(Line::from(vec![label("GitHub:"), link(GITHUB)]));
    if !compact {
        links.push((info.len() as u16, LINKEDIN));
        info.push(Line::from(vec![label("LinkedIn:"), link(LINKEDIN)]));
    }

    let name_w = if mode == HeaderMode::Wide { NAME_W } else { 0 };
    let [info_a, _, menu_a, _, name_a] = Layout::horizontal([
        Constraint::Length(INFO_W.min(area.width)),
        Constraint::Length(4),
        Constraint::Length(MENU_W),
        Constraint::Fill(1),
        Constraint::Length(name_w),
    ])
    .areas(area);
    f.render_widget(Paragraph::new(info), info_a);
    for (row, url) in links {
        let w = (display_url(url).chars().count() as u16).min(info_a.width.saturating_sub(10));
        app.hits.push((Rect::new(info_a.x + 10, info_a.y + row, w, 1), Action::Link(url)));
    }

    // Hotkeys, k9s-style. Each one is clickable.
    let views: Vec<(String, &str, Action)> = View::ALL
        .iter()
        .enumerate()
        .map(|(i, v)| (format!("<{}>", i + 1), v.name(), Action::Show(*v)))
        .collect();

    if compact {
        // One row of view keys under the info block.
        let y = area.y + area.height - 1;
        let mut x = area.x;
        for (k, name, action) in &views {
            let shown = if *name == "experience" { "exp" } else { name };
            let w = (k.len() + 1 + shown.len()) as u16;
            if x + w > area.x + area.width {
                break;
            }
            let r = Rect::new(x, y, w, 1);
            f.render_widget(Paragraph::new(menu_item(k, shown, app.view.name() == *name, true)), r);
            app.hits.push((r, *action));
            x += w + 1;
        }
        return;
    }

    let cmds: Vec<(String, &str, Option<Action>)> = vec![
        ("<enter>".into(), "describe", Some(Action::Describe)),
        ("<esc>".into(), "back", Some(Action::Back)),
        ("<j/k>".into(), "down/up", None),
    ];
    let col_w = 17u16;
    for (row, (k, name, action)) in views.iter().enumerate() {
        let r = Rect::new(menu_a.x, menu_a.y + row as u16, col_w, 1);
        f.render_widget(Paragraph::new(menu_item(k, name, app.view.name() == *name, true)), r);
        app.hits.push((r, *action));
    }
    for (row, (k, name, action)) in cmds.iter().enumerate() {
        let r = Rect::new(menu_a.x + col_w + 3, menu_a.y + row as u16, col_w, 1);
        f.render_widget(Paragraph::new(menu_item(k, name, false, false)), r);
        if let Some(a) = action {
            app.hits.push((r, *a));
        }
    }

    if name_w > 0 {
        f.render_widget(big_name(), Rect::new(name_a.x, name_a.y, NAME_W, NAME_H));
    }
}

fn menu_item(key: &str, name: &str, active: bool, numbered: bool) -> Line<'static> {
    let key_color = if numbered { skin::FUCHSIA } else { skin::DODGER };
    let name_style = if active { Style::new().fg(skin::FG).bold() } else { Style::new().fg(skin::DIM) };
    Line::from(vec![
        Span::styled(key.to_string(), Style::new().fg(key_color)),
        Span::raw(" "),
        Span::styled(name.to_string(), name_style),
    ])
}

// ---------------------------------------------------------------- frame

fn frame<'a>(title: Vec<Span<'a>>) -> Block<'a> {
    Block::bordered()
        .border_style(Style::new().fg(skin::DODGER))
        .title(Line::from(title).centered())
        .bg(skin::BG)
}

fn t<'a>(s: impl Into<String>, c: Color) -> Span<'a> {
    Span::styled(s.into(), Style::new().fg(c).bold())
}

// ---------------------------------------------------------------- table view

/// Draws the resource table. Returns the row under the mouse, or the selected row.
fn draw_table(f: &mut Frame, app: &mut App, area: Rect) -> usize {
    let view = app.view;
    let block = frame(vec![
        t(format!(" {}(", view.name()), skin::AQUA),
        t(view.scope(), skin::FUCHSIA),
        t(")[", skin::AQUA),
        t(view.len().to_string(), skin::PAPAYA),
        t("] ", skin::AQUA),
    ]);
    let inner = block.inner(area);
    f.render_widget(block, area);
    let inner = Rect { x: inner.x + 1, width: inner.width.saturating_sub(2), ..inner };

    let w = inner.width;
    let (headers, widths, rows): (Vec<&str>, Vec<Constraint>, Vec<Vec<String>>) = match view {
        View::Experience => {
            let rows = JOBS
                .iter()
                .map(|j| {
                    let mut p = j.period.split('–').map(str::trim);
                    let from = p.next().unwrap_or("").to_string();
                    let to = p.next().map(str::to_string).unwrap_or_else(|| from.clone());
                    vec![
                        j.company.to_string(),
                        j.title.to_string(),
                        from,
                        to,
                        age(j.period, app.now),
                        j.details.len().to_string(),
                    ]
                })
                .collect();
            if w >= 90 {
                (
                    vec!["COMPANY", "TITLE", "FROM", "TO", "AGE", "NOTES"],
                    vec![
                        Constraint::Fill(3),
                        Constraint::Fill(3),
                        Constraint::Length(9),
                        Constraint::Length(9),
                        Constraint::Length(5),
                        Constraint::Length(5),
                    ],
                    rows,
                )
            } else {
                let rows = rows.into_iter().map(|r| vec![r[0].clone(), r[2].clone(), r[4].clone()]).collect();
                (
                    vec!["COMPANY", "FROM", "AGE"],
                    vec![Constraint::Fill(1), Constraint::Length(9), Constraint::Length(5)],
                    rows,
                )
            }
        }
        View::Credits => {
            let rows: Vec<Vec<String>> =
                CREDITS.iter().map(|c| vec![c.title.into(), c.year.into(), c.role.into()]).collect();
            if w >= 70 {
                (
                    vec!["TITLE", "YEAR", "CREDITED AS"],
                    vec![Constraint::Fill(4), Constraint::Length(5), Constraint::Fill(3)],
                    rows,
                )
            } else {
                let rows = rows.into_iter().map(|r| vec![r[0].clone(), r[1].clone()]).collect();
                (vec!["TITLE", "YEAR"], vec![Constraint::Fill(1), Constraint::Length(5)], rows)
            }
        }
        View::Skills => {
            let rows: Vec<Vec<String>> = SKILLS
                .iter()
                .map(|s| vec![s.label.into(), s.items.len().to_string(), s.items.join(", ")])
                .collect();
            if w >= 70 {
                (
                    vec!["GROUP", "TOOLS", "ITEMS"],
                    vec![Constraint::Length(28), Constraint::Length(6), Constraint::Fill(1)],
                    rows,
                )
            } else {
                let rows = rows.into_iter().map(|r| vec![r[0].clone(), r[1].clone()]).collect();
                (vec!["GROUP", "TOOLS"], vec![Constraint::Fill(1), Constraint::Length(6)], rows)
            }
        }
        View::About => unreachable!("about always describes"),
    };

    let visible = inner.height.saturating_sub(1) as usize;
    let sel = app.selected();
    let offset = sel.saturating_sub(visible.saturating_sub(1));
    let hover_row = app
        .hover
        .filter(|p| p.x >= inner.x && p.x < inner.x + inner.width)
        .and_then(|p| (p.y as usize).checked_sub(inner.y as usize + 1))
        .map(|r| r + offset);

    let header = Row::new(headers.iter().map(|h| {
        let mut c = Cell::from(*h).style(Style::new().fg(skin::FG).bold());
        if (view == View::Experience && *h == "FROM") || (view == View::Credits && *h == "YEAR") {
            c = Cell::from(Line::from(vec![Span::raw(*h).fg(skin::FG).bold(), Span::raw("↓").fg(skin::FUCHSIA)]));
        }
        c
    }));
    let body = rows.into_iter().enumerate().map(|(i, r)| {
        let row = Row::new(r).style(Style::new().fg(skin::AQUA));
        if Some(i) == hover_row && i != sel {
            row.bg(skin::HOVER)
        } else {
            row
        }
    });
    let table = Table::new(body, widths)
        .header(header)
        .column_spacing(2)
        .row_highlight_style(Style::new().bg(skin::AQUA).fg(skin::BG));
    let mut state = TableState::default().with_offset(offset).with_selected(Some(sel));
    f.render_stateful_widget(table, inner, &mut state);

    for i in offset..(offset + visible).min(view.len()) {
        let r = Rect::new(inner.x, inner.y + 1 + (i - offset) as u16, inner.width, 1);
        app.hits.push((r, Action::Open(i)));
    }
    hover_row.filter(|&r| r < view.len() && r < offset + visible).unwrap_or(sel)
}

// ---------------------------------------------------------------- covers

/// Largest cover (cols, rows) that fits, keeping the 3:4 aspect. Half-block pixels are about
/// square, so one cell is one pixel wide and two pixels tall. Capped at native size.
fn cover_size(max_rows: u16, max_cols: u16) -> (u16, u16) {
    let max_rows = max_rows.min((covers::H / 2) as u16);
    let w = ((max_rows as usize * 2 * covers::W / covers::H) as u16).min(max_cols).max(1);
    let px_h = w as usize * covers::H / covers::W;
    (w, px_h.div_ceil(2) as u16)
}

/// Average colour of the source pixels that map onto target pixel (x, y) of a tw x th image.
fn sample(px: &[u8], x: usize, y: usize, tw: usize, th: usize) -> Color {
    let (x0, y0) = (x * covers::W / tw, y * covers::H / th);
    let x1 = ((x + 1) * covers::W / tw).max(x0 + 1).min(covers::W);
    let y1 = ((y + 1) * covers::H / th).max(y0 + 1).min(covers::H);
    let (mut r, mut g, mut b, mut n) = (0u32, 0u32, 0u32, 0u32);
    for sy in y0..y1 {
        for sx in x0..x1 {
            let i = (sy * covers::W + sx) * 3;
            r += px[i] as u32;
            g += px[i + 1] as u32;
            b += px[i + 2] as u32;
            n += 1;
        }
    }
    Color::Rgb((r / n) as u8, (g / n) as u8, (b / n) as u8)
}

/// Paints a cover into `r` with half blocks: each cell's top pixel is the foreground of "▀",
/// its bottom pixel the background.
fn draw_cover(f: &mut Frame, slug: &str, r: Rect) {
    let Some(px) = covers::cover(slug) else { return };
    let tw = r.width as usize;
    let th = tw * covers::H / covers::W;
    let buf = f.buffer_mut();
    for cy in 0..r.height as usize {
        let (top_y, bot_y) = (cy * 2, cy * 2 + 1);
        if top_y >= th {
            break;
        }
        for cx in 0..tw {
            let top = sample(px, cx, top_y, tw, th);
            let bot = if bot_y < th { sample(px, cx, bot_y, tw, th) } else { skin::BG };
            if let Some(cell) = buf.cell_mut((r.x + cx as u16, r.y + cy as u16)) {
                cell.set_symbol("▀").set_fg(top).set_bg(bot);
            }
        }
    }
}

/// Framed cover preview beside the credits table, with title and credit underneath.
fn draw_cover_panel(f: &mut Frame, app: &mut App, area: Rect, i: usize) {
    let c = &CREDITS[i];
    let block = frame(vec![
        t(" cover(", skin::AQUA),
        t(ellipsize(c.slug, (area.width as usize).saturating_sub(12)), skin::PAPAYA),
        t(") ", skin::AQUA),
    ]);
    let inner = block.inner(area);
    f.render_widget(block, area);

    let (cw, ch) = cover_size(inner.height.saturating_sub(4), inner.width.saturating_sub(2));
    let r = Rect::new(inner.x + (inner.width.saturating_sub(cw)) / 2, inner.y + 1, cw, ch);
    draw_cover(f, c.slug, r);
    app.hits.push((r, Action::Open(i)));

    let w = inner.width.saturating_sub(2) as usize;
    let caption = vec![
        Line::from(ellipsize(c.title, w)).fg(skin::FG).bold().centered(),
        Line::from(ellipsize(&format!("{} · {}", c.year, c.role), w)).fg(skin::DIM).centered(),
    ];
    let cap = Rect::new(inner.x, r.bottom() + 1, inner.width, 2).intersection(inner);
    f.render_widget(Paragraph::new(caption), cap);
}

// ---------------------------------------------------------------- describe view

fn draw_describe(f: &mut Frame, app: &mut App, area: Rect) {
    let view = app.view;
    let i = app.selected();
    let fixed = " describe(".len() + view.name().len() + "/".len() + ") ".len() + 4;
    let id = ellipsize(view.id(i), (area.width as usize).saturating_sub(fixed));
    let block = frame(vec![
        t(" describe(", skin::AQUA),
        t(view.name(), skin::FUCHSIA),
        t("/", skin::AQUA),
        t(id, skin::PAPAYA),
        t(") ", skin::AQUA),
    ]);
    let inner = block.inner(area);
    f.render_widget(block, area);
    let inner = Rect { x: inner.x + 1, width: inner.width.saturating_sub(2), ..inner };
    let mut cover_at: Option<Rect> = None;
    let inner = if view == View::Credits {
        if inner.width >= 60 {
            let (cw, ch) = cover_size(inner.height, inner.width / 2);
            cover_at = Some(Rect::new(inner.x, inner.y, cw, ch));
            Rect { x: inner.x + cw + 3, width: inner.width.saturating_sub(cw + 3), ..inner }
        } else {
            let (cw, ch) = cover_size(inner.height.saturating_sub(6).min(14), inner.width);
            cover_at = Some(Rect::new(inner.x, inner.y, cw, ch));
            Rect { y: inner.y + ch + 1, height: inner.height.saturating_sub(ch + 1), ..inner }
        }
    } else {
        inner
    };
    let width = inner.width as usize;

    let mut lines: Vec<Line> = Vec::new();
    // (line index, column offset, url) of links inside the scrolling text.
    let mut link_lines: Vec<(u16, u16, &'static str)> = Vec::new();
    match view {
        View::Experience => {
            let j = &JOBS[i];
            kv_wrapped(&mut lines, "company", j.company, width);
            kv_wrapped(&mut lines, "title", j.title, width);
            kv_wrapped(&mut lines, "period", j.period, width);
            kv_wrapped(&mut lines, "tenure", &age(j.period, app.now), width);
            lines.push(Line::raw(""));
            if j.details.is_empty() {
                lines.push(Line::from(vec![key("highlights"), Span::raw(" []").fg(skin::PAPAYA)]));
            } else {
                lines.push(Line::from(key("highlights")));
                for d in j.details {
                    list_item(&mut lines, d, width, None);
                }
            }
        }
        View::Credits => {
            let c = &CREDITS[i];
            kv_wrapped(&mut lines, "title", c.title, width);
            kv_wrapped(&mut lines, "year", c.year, width);
            kv_wrapped(&mut lines, "credited_as", c.role, width);
        }
        View::Skills => {
            let s = &SKILLS[i];
            kv_wrapped(&mut lines, "group", s.label, width);
            kv_wrapped(&mut lines, "tools", &s.items.len().to_string(), width);
            lines.push(Line::raw(""));
            lines.push(Line::from(key("items")));
            for item in s.items {
                let at = used_at(item);
                let note = (!at.is_empty()).then(|| format!("used at {}", at.join(", ")));
                list_item(&mut lines, item, width, note);
            }
        }
        View::About => {
            kv_wrapped(&mut lines, "name", PROFILE.name, width);
            kv_wrapped(&mut lines, "title", PROFILE.title, width);
            kv_wrapped(&mut lines, "focus", PROFILE.discipline, width);
            kv_wrapped(&mut lines, "summary", PROFILE.pitch, width);
            for (k, url) in [("github", GITHUB), ("linkedin", LINKEDIN)] {
                link_lines.push((lines.len() as u16, k.len() as u16 + 2, url));
                lines.push(Line::from(vec![key(k), Span::raw(" "), link_span(url)]));
            }
            kv_wrapped(&mut lines, "employers", &EMPLOYERS.join(", "), width);
            kv_wrapped(&mut lines, "specialties", &SPECIALTIES.join(", "), width);
            lines.push(Line::raw(""));
            lines.push(Line::from(vec![key("about"), Span::raw(" |").fg(skin::FG)]));
            for (n, p) in ABOUT.iter().enumerate() {
                if n > 0 {
                    lines.push(Line::raw(""));
                }
                for l in wrap(p, width.saturating_sub(2)) {
                    lines.push(Line::from(format!("  {l}")).fg(skin::PAPAYA));
                }
            }
        }
    }

    let h = inner.height;
    app.page = h.saturating_sub(1);
    app.max_scroll = (lines.len() as u16).saturating_sub(h);
    app.scroll = app.scroll.min(app.max_scroll);
    f.render_widget(Paragraph::new(lines).scroll((app.scroll, 0)), inner);
    if let Some(r) = cover_at {
        draw_cover(f, CREDITS[i].slug, r);
    }
    for (line, col, url) in link_lines {
        if line >= app.scroll && line - app.scroll < h {
            let w = (display_url(url).chars().count() as u16).min(inner.width.saturating_sub(col));
            app.hits.push((Rect::new(inner.x + col, inner.y + line - app.scroll, w, 1), Action::Link(url)));
        }
    }

    // Scroll controls on the bottom border, clickable (there is no wheel event).
    if app.max_scroll > 0 {
        let y = area.y + area.height - 1;
        let pct = (app.scroll as u32 * 100 / app.max_scroll as u32) as u16;
        let up = " ▲ up ";
        let down = " ▼ more ";
        let label = format!(" {pct:>3}% ");
        let total = (up.chars().count() + down.chars().count() + label.len()) as u16;
        let x = area.x + area.width.saturating_sub(total + 2);
        let up_r = Rect::new(x, y, up.chars().count() as u16, 1);
        let lbl_r = Rect::new(up_r.right(), y, label.len() as u16, 1);
        let down_r = Rect::new(lbl_r.right(), y, down.chars().count() as u16, 1);
        let on = |enabled: bool| if enabled { Style::new().fg(skin::AQUA).bold() } else { Style::new().fg(skin::DIM) };
        f.render_widget(Paragraph::new(Span::styled(up, on(app.scroll > 0))), up_r);
        f.render_widget(Paragraph::new(Span::styled(label, Style::new().fg(skin::PAPAYA))), lbl_r);
        f.render_widget(Paragraph::new(Span::styled(down, on(app.scroll < app.max_scroll))), down_r);
        app.hits.push((up_r, Action::Up));
        app.hits.push((down_r, Action::Down));
    }
}

fn key(k: &str) -> Span<'static> {
    Span::styled(format!("{k}:"), Style::new().fg(skin::STEEL))
}

fn kv(k: &str, v: &str) -> Line<'static> {
    Line::from(vec![key(k), Span::raw(" "), Span::styled(v.to_string(), Style::new().fg(skin::PAPAYA))])
}

/// `key: value` that wraps a long value onto indented lines below the key.
fn kv_wrapped(lines: &mut Vec<Line<'static>>, k: &str, v: &str, width: usize) {
    if v.chars().count() + k.len() + 2 <= width {
        lines.push(kv(k, v));
        return;
    }
    lines.push(Line::from(key(k)));
    for l in wrap(v, width.saturating_sub(2)) {
        lines.push(Line::from(format!("  {l}")).fg(skin::PAPAYA));
    }
}

fn link_span(url: &'static str) -> Span<'static> {
    Span::styled(display_url(url), Style::new().fg(skin::PAPAYA).underlined())
}

/// A YAML list item with a hanging indent, plus an optional dim `# comment`.
fn list_item(lines: &mut Vec<Line<'static>>, text: &str, width: usize, comment: Option<String>) {
    let body = wrap(text, width.saturating_sub(4).max(10));
    for (n, l) in body.iter().enumerate() {
        let lead = if n == 0 { "  - " } else { "    " };
        let mut spans = vec![Span::raw(lead).fg(skin::FG), Span::raw(l.clone()).fg(skin::PAPAYA)];
        if n + 1 == body.len() {
            if let Some(c) = &comment {
                spans.push(Span::raw(format!("  # {c}")).fg(skin::DIM));
            }
        }
        lines.push(Line::from(spans));
    }
}

/// Shortens `s` to at most `max` characters, ending in "…" when cut.
fn ellipsize(s: &str, max: usize) -> String {
    if s.chars().count() <= max {
        return s.to_string();
    }
    let keep: String = s.chars().take(max.saturating_sub(1)).collect();
    format!("{keep}…")
}

/// Greedy word wrap by character count.
fn wrap(text: &str, width: usize) -> Vec<String> {
    let width = width.max(10);
    let mut out = Vec::new();
    let mut line = String::new();
    for word in text.split_whitespace() {
        let need = line.chars().count() + word.chars().count() + usize::from(!line.is_empty());
        if need > width && !line.is_empty() {
            out.push(std::mem::take(&mut line));
        }
        if !line.is_empty() {
            line.push(' ');
        }
        line.push_str(word);
    }
    if !line.is_empty() {
        out.push(line);
    }
    out
}

// ---------------------------------------------------------------- crumbs

fn draw_crumbs(f: &mut Frame, app: &mut App, area: Rect) {
    let mut x = area.x;
    let mut crumbs: Vec<(String, Action)> = vec![(app.view.name().to_string(), Action::Back)];
    if app.describing() && app.view != View::About {
        let room = (area.width as usize).saturating_sub(app.view.name().len() + 8);
        crumbs.push((ellipsize(app.view.id(app.selected()), room), Action::Describe));
    }
    let last = crumbs.len() - 1;
    for (n, (label, action)) in crumbs.into_iter().enumerate() {
        let text = format!(" <{label}> ");
        let w = text.chars().count() as u16;
        let bg = if n == last { skin::ORANGE } else { skin::AQUA };
        let r = Rect::new(x, area.y, w.min(area.right().saturating_sub(x)), 1);
        f.render_widget(Paragraph::new(Span::styled(text, Style::new().fg(skin::BG).bg(bg))), r);
        app.hits.push((r, action));
        x += w + 1;
    }

    let hint = if app.describing() { "click ▲▼ or j/k to scroll · esc back · 1-4 views" } else { "click a row to describe · ↑↓ · 1-4 views" };
    let hw = hint.chars().count() as u16;
    if x + hw + 2 <= area.right() {
        let r = Rect::new(area.right() - hw, area.y, hw, 1);
        f.render_widget(Paragraph::new(Span::styled(hint, Style::new().fg(skin::DIM))), r);
    }
}
