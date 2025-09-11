# Etch-a-Sketch

A small browser-based version of the classic Etch A Sketch toy. A grid of square cells lets you draw by clicking and dragging the mouse.

## Features
- 16×16 grid on load (up to 100×100 via the **Change number of grids** button)
- Random color for the first stroke on each drag, which darkens with each move
- No external libraries – just HTML, CSS and vanilla JavaScript

## Getting started
1. Open `index.html` in your favourite browser.
2. Click and drag over the grid to draw.
3. Press **Change number of grids** to reset the board with a new size.

## Project structure
- `index.html` – page markup and button
- `style.css` – layout and grid styling
- `script.js` – grid creation and drawing logic

No build step or server is required; everything runs in the browser.
