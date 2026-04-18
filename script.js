const board = document.querySelector('.sketch-board');
const gridSlider = document.querySelector('.grid-slider');
const gridSizeValue = document.querySelector('.grid-size-value');
const cellCount = document.querySelector('.cell-count');
const applyGridButton = document.querySelector('.apply-grid-button');
const clearBoardButton = document.querySelector('.clear-board-button');
const shufflePaletteButton = document.querySelector('.shuffle-palette-button');
const paletteName = document.querySelector('.palette-name');
const toyBadge = document.querySelector('.toy-badge');
const screenHint = document.querySelector('.screen-hint');
const swatches = document.querySelectorAll('.swatch');

const palettes = [
    {
        name: 'Sunset Fade',
        hue: 18,
        accent: '#f58f5b',
        accentStrong: '#dd5f35',
        accentSoft: 'rgba(245, 143, 91, 0.18)',
    },
    {
        name: 'Lagoon Glow',
        hue: 188,
        accent: '#49b9b2',
        accentStrong: '#207c76',
        accentSoft: 'rgba(73, 185, 178, 0.2)',
    },
    {
        name: 'Cherry Pop',
        hue: 344,
        accent: '#ef5b74',
        accentStrong: '#c73752',
        accentSoft: 'rgba(239, 91, 116, 0.22)',
    },
    {
        name: 'Golden Hour',
        hue: 42,
        accent: '#f1af3f',
        accentStrong: '#c97d18',
        accentSoft: 'rgba(241, 175, 63, 0.22)',
    },
    {
        name: 'Night Arcade',
        hue: 224,
        accent: '#6477ff',
        accentStrong: '#4654cb',
        accentSoft: 'rgba(100, 119, 255, 0.2)',
    },
];

let currentGridSize = Number(gridSlider.value);
let activePalette = palettes[0];
let activeStroke = null;
let isDrawing = false;
let lastPaintedCell = null;

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wrapHue(hue) {
    return (hue % 360 + 360) % 360;
}

function updateGridControls(size) {
    gridSizeValue.textContent = `${size} x ${size}`;
    cellCount.textContent = `${size * size} cells`;
    applyGridButton.textContent = `Build ${size} x ${size} Grid`;
}

function updateBoardStatus(size) {
    screenHint.textContent = `${size * size} pixels ready`;
}

function updatePaletteTheme() {
    paletteName.textContent = activePalette.name;
    toyBadge.textContent = `Palette: ${activePalette.name}`;

    document.documentElement.style.setProperty('--accent', activePalette.accent);
    document.documentElement.style.setProperty('--accent-strong', activePalette.accentStrong);
    document.documentElement.style.setProperty('--accent-soft', activePalette.accentSoft);

    swatches.forEach((swatch, index) => {
        const hue = wrapHue(activePalette.hue + ((index - 1) * 16));
        const lightness = 72 - (index * 8);
        swatch.style.backgroundColor = `hsl(${hue}, 88%, ${lightness}%)`;
    });
}

function createStroke() {
    return {
        hue: wrapHue(activePalette.hue + randomBetween(-18, 18)),
        saturation: 86 + randomBetween(-4, 4),
        lightness: 78 + randomBetween(-4, 5),
    };
}

function darkenStroke() {
    if (!activeStroke) {
        return;
    }

    activeStroke.lightness = Math.max(18, activeStroke.lightness - 5);
    activeStroke.saturation = Math.max(40, activeStroke.saturation - 2);
}

function paintCell(cell) {
    if (!cell || cell === lastPaintedCell || !activeStroke) {
        return;
    }

    cell.style.backgroundColor = `hsl(${activeStroke.hue}, ${activeStroke.saturation}%, ${activeStroke.lightness}%)`;
    cell.style.boxShadow = `inset 0 0 0 1px hsla(${activeStroke.hue}, 75%, ${Math.max(activeStroke.lightness - 22, 14)}%, 0.28)`;
    cell.classList.add('is-painted');

    lastPaintedCell = cell;
    darkenStroke();
}

function buildGrid(size) {
    currentGridSize = size;
    board.style.setProperty('--grid-size', size);
    board.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < size * size; i += 1) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        fragment.appendChild(cell);
    }

    board.appendChild(fragment);
    updateGridControls(size);
    updateBoardStatus(size);
    lastPaintedCell = null;
    activeStroke = null;
}

function startStroke(cell) {
    activeStroke = createStroke();
    isDrawing = true;
    lastPaintedCell = null;
    paintCell(cell);
}

function stopDrawing() {
    isDrawing = false;
    activeStroke = null;
    lastPaintedCell = null;
}

function handleBoardPointerDown(event) {
    const cell = event.target.closest('.grid-cell');

    if (!cell) {
        return;
    }

    event.preventDefault();
    board.setPointerCapture?.(event.pointerId);
    startStroke(cell);
}

function handleBoardPointerMove(event) {
    if (!isDrawing) {
        return;
    }

    const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
    const cell = hoveredElement?.closest('.grid-cell');

    if (!cell || !board.contains(cell)) {
        return;
    }

    paintCell(cell);
}

function clearBoard() {
    buildGrid(currentGridSize);
}

function shufflePalette() {
    let nextPalette = activePalette;

    while (nextPalette === activePalette) {
        nextPalette = palettes[randomBetween(0, palettes.length - 1)];
    }

    activePalette = nextPalette;
    updatePaletteTheme();
}

gridSlider.addEventListener('input', () => {
    updateGridControls(Number(gridSlider.value));
});

applyGridButton.addEventListener('click', () => {
    buildGrid(Number(gridSlider.value));
});

clearBoardButton.addEventListener('click', clearBoard);
shufflePaletteButton.addEventListener('click', shufflePalette);

board.addEventListener('pointerdown', handleBoardPointerDown);
board.addEventListener('pointermove', handleBoardPointerMove);
board.addEventListener('pointerleave', () => {
    lastPaintedCell = null;
});

document.addEventListener('pointerup', stopDrawing);
document.addEventListener('pointercancel', stopDrawing);

updatePaletteTheme();
updateGridControls(currentGridSize);
buildGrid(currentGridSize);
