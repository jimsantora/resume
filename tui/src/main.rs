//! Browser entry point: wires Ratzilla's WebGL2 terminal to the backend-agnostic app and UI.

mod app;
mod content;
mod covers;
mod ui;

use std::{cell::RefCell, io, rc::Rc};

use ratzilla::backend::webgl2::WebGl2BackendOptions;
use ratzilla::event::{KeyCode, MouseButton, MouseEventKind};
use ratzilla::ratatui::{layout::Position, Terminal};
use ratzilla::{FontAtlasConfig, WebGl2Backend, WebRenderer};

use app::{App, Key};

/// Today as a fractional year, from the browser clock.
fn now() -> f64 {
    let d = js_sys::Date::new_0();
    d.get_full_year() as f64 + d.get_month() as f64 / 12.0
}

/// Terminal font. index.html loads it from Google Fonts; we wait for it before building the
/// glyph atlas, otherwise the atlas is rasterised from a fallback face.
const FONT: &str = "JetBrains Mono";
const FONT_PX: f32 = 15.0;

fn main() {
    console_error_panic_hook::set_once();
    wasm_bindgen_futures::spawn_local(async {
        if let Some(fonts) = web_sys::window().and_then(|w| w.document()).map(|d| d.fonts()) {
            for weight in ["400", "700"] {
                let p = fonts.load(&format!("{weight} {FONT_PX}px '{FONT}'"));
                let _ = wasm_bindgen_futures::JsFuture::from(p).await;
            }
        }
        if let Err(e) = start() {
            web_sys::console::error_1(&format!("resume tui failed to start: {e}").into());
        }
    });
}

fn start() -> io::Result<()> {
    let app = Rc::new(RefCell::new(App::new(now())));
    let options = WebGl2BackendOptions::new()
        .font_atlas_config(FontAtlasConfig::dynamic(&[FONT, "monospace"], FONT_PX));
    let backend = WebGl2Backend::new_with_options(options)?;
    let mut terminal = Terminal::new(backend)?;

    terminal.on_key_event({
        let app = app.clone();
        move |e| {
            let key = match e.code {
                KeyCode::Char(c) => Key::Char(c),
                KeyCode::Up => Key::Up,
                KeyCode::Down => Key::Down,
                KeyCode::PageUp => Key::PageUp,
                KeyCode::PageDown => Key::PageDown,
                KeyCode::Home => Key::Home,
                KeyCode::End => Key::End,
                KeyCode::Enter => Key::Enter,
                KeyCode::Esc => Key::Esc,
                KeyCode::Backspace => Key::Backspace,
                _ => return,
            };
            app.borrow_mut().key(key);
        }
    })?;

    terminal.on_mouse_event({
        let app = app.clone();
        let mut pointer = false;
        move |e| {
            let mut app = app.borrow_mut();
            let at = Position::new(e.col, e.row);
            match e.kind {
                MouseEventKind::Moved => app.hover = Some(at),
                MouseEventKind::Exited => app.hover = None,
                MouseEventKind::SingleClick(MouseButton::Left) => {
                    if let Some(url) = app.click(at) {
                        open_url(url);
                    }
                }
                _ => {}
            }
            // Pointer cursor over clickable regions. Only touch the cursor when it changes,
            // so Ratzilla's own pointer over hyperlinks still works.
            let over = app.over_hit();
            if over != pointer {
                pointer = over;
                set_cursor(if over { "pointer" } else { "" });
            }
        }
    })?;

    terminal.draw_web({
        let app = app.clone();
        move |f| ui::draw(f, &mut app.borrow_mut())
    });

    Ok(())
}

/// Opens a link in a new tab. Runs inside the click handler, so browsers treat it as user-initiated.
fn open_url(url: &str) {
    if let Some(w) = web_sys::window() {
        let _ = w.open_with_url_and_target_and_features(url, "_blank", "noopener");
    }
}

fn set_cursor(value: &str) {
    use web_sys::{window, HtmlElement};
    use wasm_bindgen::JsCast;
    let canvas = window()
        .and_then(|w| w.document())
        .and_then(|d| d.query_selector("canvas").ok().flatten())
        .and_then(|el| el.dyn_into::<HtmlElement>().ok());
    if let Some(c) = canvas {
        let _ = c.style().set_property("cursor", value);
    }
}
