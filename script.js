"use strict";
const btn = document.getElementById('btn');
const canvas = document.getElementById('canvas');
const outputData = document.getElementById('array-data');
const ctx = canvas.getContext('2d');
const dataArray = [];
let rowArray = [];
let columnArray = [];
let columnsCounter = 0;
let isDrawing = false;
btn.addEventListener('click', () => {
    makeArray();
});
if (ctx) {
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}
else {
    console.log(69);
}
const makeArray = () => {
    if (ctx) {
        for (let i = 0; i < canvas.width; i++) {
            columnArray.push([]);
        }
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        for (let i = 0; i < pixelData.length; i += 4) {
            columnsCounter += 1;
            if (columnsCounter === canvas.width) {
                columnsCounter = 0;
                dataArray.push(rowArray);
                rowArray = [];
            }
            const pixelSum = pixelData[i] + pixelData[i + 1] + pixelData[i + 2] + pixelData[i + 3];
            rowArray.push(pixelSum === 0 ? 0 : 1);
            columnArray[columnsCounter].push(pixelSum === 0 ? 0 : 1);
        }
        console.log(dataArray);
        console.log(columnArray);
        outputData.textContent = JSON.stringify(columnArray);
    }
    else {
        console.error('2D rendering context not supported');
    }
};
//# sourceMappingURL=script.js.map