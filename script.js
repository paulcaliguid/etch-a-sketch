const gridArray = [];
const numGridPerSide = 16;
const numGrid = numGridPerSide * numGridPerSide;

const containerDiv = document.querySelector('.container-div');

let containerDivWidth = window.getComputedStyle(containerDiv).getPropertyValue('width');

let gridWidth = (parseInt(containerDivWidth, 10) / numGridPerSide) - 2;

for (let i = 0; i < numGrid; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.style.width = `${gridWidth}px`;
    gridDiv.style.height = `${gridWidth}px`;
    gridDiv.style.border = '1px solid LightGray';
    gridArray.push(gridDiv);
    containerDiv.appendChild(gridArray[i]);
}

