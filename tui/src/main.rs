//! Spike: the smallest Ratzilla app that proves rendering + keyboard input in the browser.

use std::{cell::RefCell, io, rc::Rc};

use ratzilla::ratatui::{
    layout::Alignment,
    style::{Color, Stylize},
    widgets::{Block, BorderType, Paragraph},
    Terminal,
};
use ratzilla::{event::KeyCode, DomBackend, WebRenderer};

fn main() -> io::Result<()> {
    let presses = Rc::new(RefCell::new(0u32));
    let backend = DomBackend::new()?;
    let mut terminal = Terminal::new(backend)?;

    terminal.on_key_event({
        let presses = presses.clone();
        move |key| {
            if let KeyCode::Char(_) | KeyCode::Enter | KeyCode::Up | KeyCode::Down = key.code {
                *presses.borrow_mut() += 1;
            }
        }
    })?;

    terminal.draw_web(move |f| {
        let n = *presses.borrow();
        let block = Block::bordered()
            .border_type(BorderType::Rounded)
            .border_style(Color::Cyan)
            .title(" resume(spike)[1] ".bold())
            .title_alignment(Alignment::Center);
        let text = format!("Jim Santora · Staff Engineer\n\nRatzilla is running from static files.\nKeys pressed: {n}");
        f.render_widget(Paragraph::new(text).alignment(Alignment::Center).block(block), f.area());
    });

    Ok(())
}
