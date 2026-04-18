const board = document.querySelector('.sketch-board');
const gridSlider = document.querySelector('.grid-slider');
const gridSizeValue = document.querySelector('.grid-size-value');
const cellCount = document.querySelector('.cell-count');
const applyGridButton = document.querySelector('.apply-grid-button');
const clearBoardButton = document.querySelector('.clear-board-button');
const shufflePaletteButton = document.querySelector('.shuffle-palette-button');
const replaySketchButton = document.querySelector('.replay-sketch-button');
const paletteName = document.querySelector('.palette-name');
const toyBadge = document.querySelector('.toy-badge');
const screenHint = document.querySelector('.screen-hint');
const swatches = document.querySelectorAll('.swatch');
const modeButtons = document.querySelectorAll('.mode-chip');
const modeDescription = document.querySelector('.mode-description');
const modeBadge = document.querySelector('.mode-badge');
const tipCopy = document.querySelector('.tip-copy');
const toyFrame = document.querySelector('.toy-frame');
const leftKnob = document.querySelector('.knob-left');
const rightKnob = document.querySelector('.knob-right');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const palettes = [
    {
        name: 'Sunset Ember',
        hue: 18,
        accent: '#f58f5b',
        accentStrong: '#dd5f35',
        accentSoft: 'rgba(245, 143, 91, 0.18)',
        accentSoftStrong: 'rgba(245, 143, 91, 0.28)',
    },
    {
        name: 'Lagoon Glow',
        hue: 188,
        accent: '#49b9b2',
        accentStrong: '#207c76',
        accentSoft: 'rgba(73, 185, 178, 0.2)',
        accentSoftStrong: 'rgba(73, 185, 178, 0.3)',
    },
    {
        name: 'Cherry Pop',
        hue: 344,
        accent: '#ef5b74',
        accentStrong: '#c73752',
        accentSoft: 'rgba(239, 91, 116, 0.22)',
        accentSoftStrong: 'rgba(239, 91, 116, 0.3)',
    },
    {
        name: 'Golden Hour',
        hue: 42,
        accent: '#f1af3f',
        accentStrong: '#c97d18',
        accentSoft: 'rgba(241, 175, 63, 0.22)',
        accentSoftStrong: 'rgba(241, 175, 63, 0.3)',
    },
    {
        name: 'Night Arcade',
        hue: 224,
        accent: '#6477ff',
        accentStrong: '#4654cb',
        accentSoft: 'rgba(100, 119, 255, 0.2)',
        accentSoftStrong: 'rgba(100, 119, 255, 0.28)',
    },
    {
        name: 'Mint Circuit',
        hue: 156,
        accent: '#39c98b',
        accentStrong: '#1f9965',
        accentSoft: 'rgba(57, 201, 139, 0.2)',
        accentSoftStrong: 'rgba(57, 201, 139, 0.3)',
    },
    {
        name: 'Citrus Burst',
        hue: 92,
        accent: '#b5d648',
        accentStrong: '#7b9c19',
        accentSoft: 'rgba(181, 214, 72, 0.2)',
        accentSoftStrong: 'rgba(181, 214, 72, 0.3)',
    },
    {
        name: 'Sky Pop',
        hue: 202,
        accent: '#54b7ff',
        accentStrong: '#2b79d6',
        accentSoft: 'rgba(84, 183, 255, 0.2)',
        accentSoftStrong: 'rgba(84, 183, 255, 0.3)',
    },
    {
        name: 'Electric Orchid',
        hue: 286,
        accent: '#c06dff',
        accentStrong: '#8743d5',
        accentSoft: 'rgba(192, 109, 255, 0.2)',
        accentSoftStrong: 'rgba(192, 109, 255, 0.3)',
    },
    {
        name: 'Lime Arcade',
        hue: 126,
        accent: '#63de6f',
        accentStrong: '#2baf49',
        accentSoft: 'rgba(99, 222, 111, 0.2)',
        accentSoftStrong: 'rgba(99, 222, 111, 0.3)',
    },
    {
        name: 'Coral Reef',
        hue: 8,
        accent: '#ff7a66',
        accentStrong: '#d94d3d',
        accentSoft: 'rgba(255, 122, 102, 0.2)',
        accentSoftStrong: 'rgba(255, 122, 102, 0.3)',
    },
];

const strokeModes = {
    orbit: {
        id: 'orbit',
        label: 'Orbit',
        trailName: 'orbit',
        description: 'Orbit glides through neighboring hues like a glowing ribbon, staying playful without getting chaotic.',
        createStroke(palette) {
            return {
                step: 0,
                baseHue: wrapHue(palette.hue + randomBetween(-14, 14)),
                orbitWidth: randomBetween(12, 24),
                orbitSpeed: randomFloat(0.3, 0.38),
                secondaryWave: randomBetween(5, 10),
                secondarySpeed: randomFloat(0.58, 0.72),
                saturationBase: 89 + randomBetween(-3, 4),
                saturationDrop: randomFloat(0.35, 0.47),
                lightnessBase: 68 + randomBetween(-3, 4),
                lightnessWave: randomBetween(8, 14),
                lightnessSpeed: randomFloat(0.42, 0.52),
                phase: randomFloat(0, Math.PI * 2),
            };
        },
        getColor(stroke) {
            const hue =
                stroke.baseHue
                + (Math.sin((stroke.step * stroke.orbitSpeed) + stroke.phase) * stroke.orbitWidth)
                + (Math.sin((stroke.step * stroke.secondarySpeed) + (stroke.phase / 2)) * stroke.secondaryWave);
            const saturation = clamp(stroke.saturationBase - (stroke.step * stroke.saturationDrop), 68, 96);
            const lightness = clamp(
                stroke.lightnessBase + (Math.sin((stroke.step * stroke.lightnessSpeed) + stroke.phase) * stroke.lightnessWave),
                44,
                82,
            );

            return {
                hue: wrapHue(hue),
                saturation: Math.round(saturation),
                lightness: Math.round(lightness),
            };
        },
    },
    heatwave: {
        id: 'heatwave',
        label: 'Heatwave',
        trailName: 'heatwave',
        description: 'Heatwave begins bright and molten, then cools into deeper ember tones with a little shimmer left behind.',
        createStroke(palette) {
            return {
                step: 0,
                baseHue: wrapHue(palette.hue + randomBetween(-6, 12)),
                flare: randomBetween(16, 28),
                cooling: randomFloat(0.7, 0.88),
                shimmer: randomBetween(4, 8),
                saturationBase: 94 + randomBetween(-2, 2),
                lightnessBase: 79 + randomBetween(-3, 3),
                phase: randomFloat(0, Math.PI * 2),
            };
        },
        getColor(stroke) {
            const hue =
                stroke.baseHue
                + stroke.flare
                - Math.min(64, stroke.step * 1.3)
                + (Math.sin((stroke.step * 0.44) + stroke.phase) * stroke.shimmer);
            const saturation = clamp(
                stroke.saturationBase - (stroke.step * 0.28) + (Math.sin((stroke.step * 0.33) + stroke.phase) * 3),
                66,
                98,
            );
            const lightness = clamp(
                stroke.lightnessBase - (stroke.step * stroke.cooling) + (Math.abs(Math.sin((stroke.step * 0.34) + stroke.phase)) * 7),
                34,
                84,
            );

            return {
                hue: wrapHue(hue),
                saturation: Math.round(saturation),
                lightness: Math.round(lightness),
            };
        },
    },
    aurora: {
        id: 'aurora',
        label: 'Aurora',
        trailName: 'aurora',
        description: 'Aurora sweeps farther from the base hue with cool-warm shimmer, like a soft neon curtain moving across the board.',
        createStroke(palette) {
            return {
                step: 0,
                baseHue: wrapHue(palette.hue + randomBetween(-18, 18)),
                arc: randomBetween(24, 38),
                arcSpeed: randomFloat(0.24, 0.34),
                sway: randomBetween(10, 18),
                swaySpeed: randomFloat(0.11, 0.18),
                saturationBase: 82 + randomBetween(-3, 5),
                lightnessBase: 62 + randomBetween(-4, 5),
                phase: randomFloat(0, Math.PI * 2),
            };
        },
        getColor(stroke) {
            const hue =
                stroke.baseHue
                + (Math.sin((stroke.step * stroke.arcSpeed) + stroke.phase) * stroke.arc)
                + (Math.cos((stroke.step * stroke.swaySpeed) + (stroke.phase / 2)) * stroke.sway);
            const saturation = clamp(
                stroke.saturationBase + (Math.sin((stroke.step * 0.26) + stroke.phase) * 8),
                68,
                96,
            );
            const lightness = clamp(
                stroke.lightnessBase + (Math.cos((stroke.step * 0.38) + stroke.phase) * 12),
                46,
                82,
            );

            return {
                hue: wrapHue(hue),
                saturation: Math.round(saturation),
                lightness: Math.round(lightness),
            };
        },
    },
    confetti: {
        id: 'confetti',
        label: 'Confetti',
        trailName: 'confetti',
        description: 'Confetti snaps between punchy palette accents for playful poster-like pops that still stay inside the chosen mood.',
        createStroke(palette) {
            return {
                step: 0,
                baseHue: wrapHue(palette.hue + randomBetween(-20, 20)),
                jumps: [
                    randomBetween(-34, -12),
                    randomBetween(-6, 10),
                    randomBetween(18, 42),
                    randomBetween(50, 80),
                ],
                pulseSize: randomBetween(2, 4),
                saturationBase: 92 + randomBetween(-2, 4),
                phase: randomFloat(0, Math.PI * 2),
            };
        },
        getColor(stroke) {
            const jumpIndex = Math.floor(stroke.step / stroke.pulseSize) % stroke.jumps.length;
            const localStep = stroke.step % stroke.pulseSize;
            const hue = stroke.baseHue + stroke.jumps[jumpIndex] + (Math.sin((stroke.step * 1.14) + stroke.phase) * 6);
            const saturation = clamp(
                stroke.saturationBase - (localStep * 2) + (Math.sin((stroke.step * 0.5) + stroke.phase) * 3),
                72,
                98,
            );
            const lightness = clamp(
                74 - (localStep * 5) + (Math.abs(Math.sin((stroke.step * 0.8) + stroke.phase)) * 6),
                48,
                86,
            );

            return {
                hue: wrapHue(hue),
                saturation: Math.round(saturation),
                lightness: Math.round(lightness),
            };
        },
    },
};

const modeOrder = ['orbit', 'heatwave', 'aurora', 'confetti'];

let currentGridSize = Number(gridSlider.value);
let activePalette = palettes[0];
let activeMode = strokeModes.orbit;
let activeStroke = null;
let isDrawing = false;
let isResetting = false;
let paintedCellsCount = 0;
let cellElements = [];
let lastPaintedCell = null;
let lastCellPosition = null;
let activePointerId = null;
let knobResetTimer = null;
let boardRect = null;
let pendingPointerPosition = null;
let drawFrameId = null;
let statusFrameId = null;
let currentSketchActions = [];
let replaySnapshot = null;
let isReplaying = false;
let replayFrameId = null;

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

function wrapHue(hue) {
    return (hue % 360 + 360) % 360;
}

function wait(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

function cloneSketchSnapshot(snapshot) {
    if (!snapshot) {
        return null;
    }

    return {
        ...snapshot,
        actions: snapshot.actions.map((action) => ({ ...action })),
    };
}

function createSketchSnapshotFromCurrentBoard() {
    if (currentSketchActions.length === 0) {
        return null;
    }

    return {
        size: currentGridSize,
        modeLabel: activeMode.label,
        paletteName: activePalette.name,
        actions: currentSketchActions.map((action) => ({ ...action })),
    };
}

function getReplaySource() {
    const currentSnapshot = createSketchSnapshotFromCurrentBoard();

    if (currentSnapshot) {
        return currentSnapshot;
    }

    return cloneSketchSnapshot(replaySnapshot);
}

function updateReplayButtonState() {
    const hasReplay = Boolean(getReplaySource()?.actions.length);
    const isDisabled = isResetting || isReplaying || !hasReplay;

    replaySketchButton.disabled = isDisabled;
    replaySketchButton.classList.toggle('is-ready', hasReplay && !isResetting && !isReplaying);
    replaySketchButton.textContent = isReplaying ? 'Replaying...' : 'Replay Last Sketch';
}

function refreshBoardRect() {
    boardRect = board.getBoundingClientRect();
}

function cancelScheduledDraw() {
    if (drawFrameId !== null) {
        window.cancelAnimationFrame(drawFrameId);
        drawFrameId = null;
    }

    pendingPointerPosition = null;
}

function cancelReplayAnimation() {
    if (replayFrameId !== null) {
        window.cancelAnimationFrame(replayFrameId);
        replayFrameId = null;
    }
}

function getTotalCells(size = currentGridSize) {
    return size * size;
}

function getCellIndex(row, col) {
    return (row * currentGridSize) + col;
}

function getCellByPosition(position) {
    if (!position) {
        return null;
    }

    return cellElements[getCellIndex(position.row, position.col)] ?? null;
}

function setKnobVisuals(leftAngle, rightAngle, scale = 1) {
    leftKnob.style.setProperty('--knob-angle', `${leftAngle}deg`);
    rightKnob.style.setProperty('--knob-angle', `${rightAngle}deg`);
    leftKnob.style.setProperty('--knob-scale', String(scale));
    rightKnob.style.setProperty('--knob-scale', String(scale));
}

function settleKnobs() {
    window.clearTimeout(knobResetTimer);
    setKnobVisuals(0, 0, 1);
}

function reactToMovement(fromPosition, toPosition) {
    if (prefersReducedMotion.matches || !fromPosition || !toPosition) {
        return;
    }

    const deltaCol = toPosition.col - fromPosition.col;
    const deltaRow = toPosition.row - fromPosition.row;

    if (deltaCol === 0 && deltaRow === 0) {
        return;
    }

    const leftAngle = clamp((deltaRow * 10) - (deltaCol * 14), -34, 34);
    const rightAngle = clamp((deltaRow * 10) + (deltaCol * 14), -34, 34);

    setKnobVisuals(leftAngle, rightAngle, 1.04);
    window.clearTimeout(knobResetTimer);
    knobResetTimer = window.setTimeout(() => {
        setKnobVisuals(0, 0, 1);
    }, 120);
}

function updateGridControls(size) {
    gridSizeValue.textContent = `${size} x ${size}`;
    cellCount.textContent = `${size * size} cells`;
    applyGridButton.textContent = `Build ${size} x ${size} Grid`;
}

function updateBoardStatus() {
    const totalCells = getTotalCells();

    if (paintedCellsCount === 0) {
        screenHint.textContent = `${totalCells} pixels ready`;
        return;
    }

    screenHint.textContent = `${paintedCellsCount} of ${totalCells} lit`;
}

function scheduleBoardStatusUpdate() {
    if (statusFrameId !== null) {
        return;
    }

    statusFrameId = window.requestAnimationFrame(() => {
        statusFrameId = null;
        updateBoardStatus();
    });
}

function flushBoardStatusUpdate() {
    if (statusFrameId !== null) {
        window.cancelAnimationFrame(statusFrameId);
        statusFrameId = null;
    }

    updateBoardStatus();
}

function updatePaletteTheme() {
    paletteName.textContent = activePalette.name;
    toyBadge.textContent = `Palette: ${activePalette.name}`;

    document.documentElement.style.setProperty('--accent', activePalette.accent);
    document.documentElement.style.setProperty('--accent-strong', activePalette.accentStrong);
    document.documentElement.style.setProperty('--accent-soft', activePalette.accentSoft);
    document.documentElement.style.setProperty('--accent-soft-strong', activePalette.accentSoftStrong);

    swatches.forEach((swatch, index) => {
        const hue = wrapHue(activePalette.hue + ((index - 1) * 18));
        const lightness = 72 - (index * 8);
        swatch.style.backgroundColor = `hsl(${hue}, 88%, ${lightness}%)`;
    });
}

function updateModeUI() {
    modeDescription.textContent = activeMode.description;
    modeBadge.textContent = `Mode: ${activeMode.label}`;
    tipCopy.textContent = `Click or tap, then drag across the screen. Release to begin a fresh ${activeMode.trailName} trail.`;

    modeButtons.forEach((button) => {
        const isActive = button.dataset.mode === activeMode.id;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function setControlsDisabled(isDisabled) {
    gridSlider.disabled = isDisabled;
    applyGridButton.disabled = isDisabled;
    shufflePaletteButton.disabled = isDisabled;
    clearBoardButton.disabled = isDisabled;
    replaySketchButton.disabled = isDisabled;

    modeButtons.forEach((button) => {
        button.disabled = isDisabled;
    });

    clearBoardButton.classList.toggle('is-busy', isDisabled);
    clearBoardButton.textContent = isDisabled ? 'Shaking...' : 'Shake To Erase';

    if (!isDisabled) {
        updateReplayButtonState();
    }
}

function buildGrid(size) {
    if (!isReplaying && currentSketchActions.length > 0) {
        replaySnapshot = createSketchSnapshotFromCurrentBoard();
    }

    currentGridSize = size;
    isDrawing = false;
    paintedCellsCount = 0;
    cellElements = [];
    activeStroke = null;
    lastPaintedCell = null;
    lastCellPosition = null;
    activePointerId = null;
    currentSketchActions = [];

    cancelScheduledDraw();
    cancelReplayAnimation();

    board.style.setProperty('--grid-size', size);
    board.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = String(row);
            cell.dataset.col = String(col);
            cellElements.push(cell);
            fragment.appendChild(cell);
        }
    }

    board.appendChild(fragment);
    board.classList.remove('is-resetting');
    toyFrame.classList.remove('is-shaking');

    updateGridControls(size);
    flushBoardStatusUpdate();
    settleKnobs();
    refreshBoardRect();
    updateReplayButtonState();
}

function createStroke() {
    return activeMode.createStroke(activePalette);
}

function getStrokeColor() {
    return activeMode.getColor(activeStroke);
}

function paintCell(cell, { record = true } = {}) {
    if (!cell || cell === lastPaintedCell || !activeStroke || isResetting) {
        return;
    }

    const strokeColor = getStrokeColor();
    const wasPainted = cell.classList.contains('is-painted');
    const cellColor = `hsl(${strokeColor.hue}, ${strokeColor.saturation}%, ${strokeColor.lightness}%)`;
    const cellShadow = currentGridSize <= 28
        ? `inset 0 0 0 1px hsla(${strokeColor.hue}, 75%, ${Math.max(strokeColor.lightness - 18, 18)}%, 0.28)`
        : 'none';

    cell.style.backgroundColor = cellColor;
    cell.style.boxShadow = cellShadow;
    cell.classList.add('is-painted');

    if (record) {
        currentSketchActions.push({
            row: Number(cell.dataset.row),
            col: Number(cell.dataset.col),
            backgroundColor: cellColor,
            boxShadow: cellShadow,
        });

        if (currentSketchActions.length === 1) {
            updateReplayButtonState();
        }
    }

    if (!wasPainted) {
        paintedCellsCount += 1;
        scheduleBoardStatusUpdate();
    }

    lastPaintedCell = cell;
    activeStroke.step += 1;
}

function paintPath(fromPosition, toPosition) {
    if (!toPosition) {
        return;
    }

    if (!fromPosition) {
        paintCell(getCellByPosition(toPosition));
        return;
    }

    reactToMovement(fromPosition, toPosition);

    const rowDistance = toPosition.row - fromPosition.row;
    const colDistance = toPosition.col - fromPosition.col;
    const steps = Math.max(Math.abs(rowDistance), Math.abs(colDistance));

    if (steps === 0) {
        paintCell(getCellByPosition(toPosition));
        return;
    }

    for (let index = 0; index <= steps; index += 1) {
        const progress = index / steps;
        const row = Math.round(fromPosition.row + (rowDistance * progress));
        const col = Math.round(fromPosition.col + (colDistance * progress));
        paintCell(getCellByPosition({ row, col }));
    }
}

function getCellPositionFromPoint(clientX, clientY) {
    const rect = boardRect ?? board.getBoundingClientRect();

    if (
        clientX < rect.left
        || clientX > rect.right
        || clientY < rect.top
        || clientY > rect.bottom
    ) {
        return null;
    }

    const x = clamp(clientX - rect.left, 0, rect.width - 0.001);
    const y = clamp(clientY - rect.top, 0, rect.height - 0.001);
    const col = Math.min(currentGridSize - 1, Math.floor((x / rect.width) * currentGridSize));
    const row = Math.min(currentGridSize - 1, Math.floor((y / rect.height) * currentGridSize));

    return { row, col };
}

function startStroke(position, pointerId) {
    activeStroke = createStroke();
    isDrawing = true;
    activePointerId = pointerId;
    lastPaintedCell = null;
    lastCellPosition = position;
    pendingPointerPosition = null;

    setKnobVisuals(0, 0, 1.03);
    paintPath(null, position);
}

function stopDrawing(event) {
    if (event?.pointerId !== undefined && activePointerId !== null && event.pointerId !== activePointerId) {
        return;
    }

    if (pendingPointerPosition && activeStroke) {
        paintPath(lastCellPosition, pendingPointerPosition);
        lastCellPosition = pendingPointerPosition;
    }

    cancelScheduledDraw();
    flushBoardStatusUpdate();

    isDrawing = false;
    activeStroke = null;
    lastPaintedCell = null;
    lastCellPosition = null;

    if (activePointerId !== null) {
        try {
            board.releasePointerCapture?.(activePointerId);
        } catch (error) {
            // Ignore release errors when the pointer is already gone.
        }
    }

    activePointerId = null;
    settleKnobs();
}

function setActiveMode(modeId) {
    if (isResetting || isReplaying || !strokeModes[modeId]) {
        return;
    }

    activeMode = strokeModes[modeId];
    updateModeUI();
}

function shufflePalette() {
    if (isResetting || isReplaying) {
        return;
    }

    let nextPalette = activePalette;

    while (nextPalette === activePalette) {
        nextPalette = palettes[randomBetween(0, palettes.length - 1)];
    }

    activePalette = nextPalette;
    updatePaletteTheme();
}

function processPendingStroke() {
    drawFrameId = null;

    if (!isDrawing || isResetting || !pendingPointerPosition) {
        return;
    }

    const nextPosition = pendingPointerPosition;
    pendingPointerPosition = null;

    paintPath(lastCellPosition, nextPosition);
    lastCellPosition = nextPosition;

    if (pendingPointerPosition) {
        scheduleStrokeFrame();
    }
}

function scheduleStrokeFrame() {
    if (!isDrawing || drawFrameId !== null) {
        return;
    }

    drawFrameId = window.requestAnimationFrame(processPendingStroke);
}

function applyRecordedAction(action) {
    const cell = getCellByPosition({ row: action.row, col: action.col });

    if (!cell) {
        return;
    }

    const wasPainted = cell.classList.contains('is-painted');

    cell.style.backgroundColor = action.backgroundColor;
    cell.style.boxShadow = action.boxShadow;
    cell.classList.add('is-painted');

    if (!wasPainted) {
        paintedCellsCount += 1;
    }
}

function animateSketchReplay(snapshot) {
    const actions = snapshot.actions;

    if (actions.length === 0) {
        flushBoardStatusUpdate();
        return Promise.resolve();
    }

    const totalDuration = prefersReducedMotion.matches ? 0 : clamp(actions.length * 9.5, 1450, 6500);
    let index = 0;

    return new Promise((resolve) => {
        const startTime = window.performance.now();

        const step = (timestamp) => {
            const progress = totalDuration === 0
                ? 1
                : clamp((timestamp - startTime) / totalDuration, 0, 1);
            const targetIndex = Math.floor(progress * actions.length);
            const frameEnd = Math.min(actions.length, targetIndex);

            for (; index < frameEnd; index += 1) {
                applyRecordedAction(actions[index]);
            }

            scheduleBoardStatusUpdate();
            screenHint.textContent = progress < 1
                ? `Replaying ${index} of ${actions.length}`
                : `${paintedCellsCount} of ${getTotalCells()} lit`;

            if (index < actions.length) {
                replayFrameId = window.requestAnimationFrame(step);
                return;
            }

            replayFrameId = null;
            flushBoardStatusUpdate();
            resolve();
        };

        replayFrameId = window.requestAnimationFrame(step);
    });
}

async function replayLastSketch() {
    if (isResetting || isReplaying) {
        return;
    }

    const snapshot = cloneSketchSnapshot(getReplaySource());

    if (!snapshot || snapshot.actions.length === 0) {
        return;
    }

    stopDrawing();
    isReplaying = true;
    replaySnapshot = cloneSketchSnapshot(snapshot);
    updateReplayButtonState();

    gridSlider.disabled = true;
    applyGridButton.disabled = true;
    shufflePaletteButton.disabled = true;
    clearBoardButton.disabled = true;

    modeButtons.forEach((button) => {
        button.disabled = true;
    });

    if (Number(gridSlider.value) !== snapshot.size) {
        gridSlider.value = String(snapshot.size);
    }

    try {
        buildGrid(snapshot.size);
        screenHint.textContent = `Replaying ${snapshot.modeLabel} sketch`;
        modeBadge.textContent = `Replay: ${snapshot.modeLabel}`;
        toyBadge.textContent = `Palette: ${snapshot.paletteName}`;

        await wait(prefersReducedMotion.matches ? 20 : 110);
        await animateSketchReplay(snapshot);

        currentSketchActions = snapshot.actions.map((action) => ({ ...action }));
    } finally {
        isReplaying = false;

        gridSlider.disabled = false;
        applyGridButton.disabled = false;
        shufflePaletteButton.disabled = false;
        clearBoardButton.disabled = false;

        modeButtons.forEach((button) => {
            button.disabled = false;
        });

        updatePaletteTheme();
        updateModeUI();
        flushBoardStatusUpdate();
        updateReplayButtonState();
    }
}

function primeEraseAnimation() {
    const paintedCells = cellElements.filter((cell) => cell.classList.contains('is-painted'));

    if (paintedCells.length === 0) {
        return false;
    }

    const midpoint = (currentGridSize - 1) / 2;

    paintedCells.forEach((cell) => {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        const distance = Math.abs(row - midpoint) + Math.abs(col - midpoint);
        const delay = prefersReducedMotion.matches ? 0 : (distance * 4) + randomBetween(0, 80);
        const scatterX = ((col - midpoint) * 1.8) + randomBetween(-8, 8);
        const scatterY = ((row - midpoint) * 1.8) + randomBetween(-8, 8);
        const rotate = randomBetween(-24, 24);

        cell.style.setProperty('--erase-delay', `${delay}ms`);
        cell.style.setProperty('--erase-x', `${scatterX}px`);
        cell.style.setProperty('--erase-y', `${scatterY}px`);
        cell.style.setProperty('--erase-rotate', `${rotate}deg`);
        cell.classList.add('is-erasing');
    });

    return true;
}

async function clearBoard() {
    if (isResetting || isReplaying) {
        return;
    }

    stopDrawing();
    isResetting = true;
    setControlsDisabled(true);
    screenHint.textContent = paintedCellsCount > 0 ? 'Shaking the pixels loose' : 'Winding up the reset';
    board.classList.add('is-resetting');
    toyFrame.classList.add('is-shaking');
    const didAnimateCells = primeEraseAnimation();

    await wait(prefersReducedMotion.matches ? 140 : (didAnimateCells ? 840 : 220));

    buildGrid(currentGridSize);
    isResetting = false;
    setControlsDisabled(false);
    updateModeUI();
    updatePaletteTheme();
}

function handleBoardPointerDown(event) {
    if (isResetting || isReplaying || isDrawing || activePointerId !== null || (event.pointerType === 'mouse' && event.button !== 0)) {
        return;
    }

    const position = getCellPositionFromPoint(event.clientX, event.clientY);

    if (!position) {
        return;
    }

    event.preventDefault();
    refreshBoardRect();
    board.setPointerCapture?.(event.pointerId);
    startStroke(position, event.pointerId);
}

function handleBoardPointerMove(event) {
    if (!isDrawing || isResetting || (activePointerId !== null && event.pointerId !== activePointerId)) {
        return;
    }

    const position = getCellPositionFromPoint(event.clientX, event.clientY);

    if (!position) {
        return;
    }

    pendingPointerPosition = position;
    scheduleStrokeFrame();
}

function handleKeydown(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || isResetting || isReplaying) {
        return;
    }

    const key = event.key.toLowerCase();

    if (key === 'r') {
        event.preventDefault();
        shufflePalette();
        return;
    }

    if (key === 'c') {
        event.preventDefault();
        clearBoard();
        return;
    }

    if (key === 'p') {
        event.preventDefault();
        replayLastSketch();
        return;
    }

    if (!['1', '2', '3', '4'].includes(key)) {
        return;
    }

    const index = Number(key) - 1;

    if (index >= 0 && index < modeOrder.length) {
        event.preventDefault();
        setActiveMode(modeOrder[index]);
    }
}

gridSlider.addEventListener('input', () => {
    updateGridControls(Number(gridSlider.value));
});

applyGridButton.addEventListener('click', () => {
    if (isResetting || isReplaying) {
        return;
    }

    buildGrid(Number(gridSlider.value));
});

clearBoardButton.addEventListener('click', clearBoard);
shufflePaletteButton.addEventListener('click', shufflePalette);
replaySketchButton.addEventListener('click', replayLastSketch);

modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveMode(button.dataset.mode);
    });
});

board.addEventListener('pointerdown', handleBoardPointerDown);
board.addEventListener('pointermove', handleBoardPointerMove);
board.addEventListener('pointerup', stopDrawing);
board.addEventListener('pointercancel', stopDrawing);
board.addEventListener('lostpointercapture', stopDrawing);

document.addEventListener('pointerup', stopDrawing);
document.addEventListener('pointercancel', stopDrawing);
document.addEventListener('keydown', handleKeydown);
window.addEventListener('blur', stopDrawing);
window.addEventListener('resize', refreshBoardRect);
window.addEventListener('scroll', refreshBoardRect, { passive: true });

updatePaletteTheme();
updateModeUI();
updateGridControls(currentGridSize);
buildGrid(currentGridSize);
