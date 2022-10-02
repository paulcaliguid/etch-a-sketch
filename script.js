let numGridPerSide = 16;
let numGridOverall = numGridPerSide * numGridPerSide;

const divContainerDiv = document.querySelector('.div-container-div');

const body = document.querySelector('body');

let containerDivWidth = window.getComputedStyle(divContainerDiv).getPropertyValue('width');

let gridWidth = (parseInt(containerDivWidth, 10) / numGridPerSide) - 2;

let buttonToSetGrids = document.querySelector('.setGridNumButton');

buttonToSetGrids.addEventListener('click', setGrid);

function setGrid(e) {
    numGridPerSide = prompt("Enter number of square in a side");
    numGridOverall = numGridPerSide * numGridPerSide;
    gridWidth = (parseInt(containerDivWidth, 10) / numGridPerSide) - 2;
    divContainerDiv.innerHTML = '';
    createGrids();
}

function createGrids() {
    for (let i = 0; i < numGridOverall; i++) {
        const gridDiv = document.createElement('div');
        gridDiv.style.width = `${gridWidth}px`;
        gridDiv.style.height = `${gridWidth}px`;
        gridDiv.style.border = '1px solid LightGray';

        gridDiv.addEventListener('mousedown', changeColorDownPressed);
        gridDiv.addEventListener('mouseup', changeColorUpPressed);
        gridDiv.addEventListener('mouseenter', changeColorDivEntered);

        divContainerDiv.appendChild(gridDiv);
    }
}

let colorToChange = false; //initial

function changeColorDownPressed(e) {
    initialRGB();
    colorToChange = true;
    e.target.style.backgroundColor = rgb;
}

function changeColorUpPressed(e) {
    colorToChange = false;
}

function changeColorDivEntered(e) {
    if (colorToChange) {
        changeRGB();
        e.target.style.backgroundColor = rgb;
    }
}

let rFactorToSubtract;
let gFactorToSubtract;
let bFactorToSubtract;

let r;
let g;
let b;
let rgb;

function initialRGB() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    r = randomBetween(0, 255);
    g = randomBetween(0, 255);
    b = randomBetween(0, 255);
    rFactorToSubtract = r * 0.1;
    gFactorToSubtract = g * 0.1;
    bFactorToSubtract = b * 0.1;
    rgb = `rgb(${r},${g},${b})`;
}

function changeRGB() {
    r = r - rFactorToSubtract;
    g = g - gFactorToSubtract;
    b = b - bFactorToSubtract;
    rgb = `rgb(${r},${g},${b})`;
}


//Initialize
initialRGB();
createGrids();
