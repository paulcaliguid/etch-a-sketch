# Etch-a-Sketch Studio

A polished browser-based take on the classic Etch A Sketch toy, rebuilt as a playful drawing studio with animated controls, multiple brush personalities, palette shuffling, sketch replay, and a toy-like shake-to-erase reset.

## Live Demo
- GitHub Pages: https://paulcaliguid.github.io/etch-a-sketch/

## Highlights
- Responsive retro-inspired interface with a framed sketch board and control panel
- Adjustable grid sizes from `8 x 8` up to `64 x 64`
- Four drawing modes: `Orbit`, `Heatwave`, `Aurora`, and `Confetti`
- Eleven curated color palettes that can be shuffled at any time
- Smooth drag interpolation so fast pointer movement still paints continuous lines
- Animated `Shake To Erase` reset with frame and knob reactions
- `Replay Last Sketch` feature that redraws your latest piece
- Keyboard shortcuts for faster play

## Controls
- Draw: click or tap, then drag across the board
- Grid size: use the slider and press `Build ... Grid`
- Shuffle palette: press the button or use `R`
- Clear board: press `Shake To Erase` or use `C`
- Replay sketch: press `Replay Last Sketch` or use `P`
- Change stroke mode: click a mode chip or use `1`, `2`, `3`, or `4`

## Getting Started
1. Open `index.html` in your browser.
2. Choose a grid size and brush mode.
3. Draw on the board with your mouse or touch input.
4. Shuffle palettes, replay your sketch, or shake the board clean.

## Project Structure
- `index.html` - page structure and controls
- `style.css` - visual design, responsive layout, and animation styling
- `script.js` - drawing logic, palettes, replay, and board interactions

## Tech
- HTML
- CSS
- Vanilla JavaScript

No build step or server is required; everything runs directly in the browser.
