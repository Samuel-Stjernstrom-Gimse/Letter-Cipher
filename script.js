import { rowArrays } from './numbers/rowArrays.js';
import { columnArrays } from './numbers/columnArrays.js';
const btn = document.getElementById('btn');
const canvas = document.getElementById('canvas');
const outputData = document.getElementById('array-data');
const ctx = canvas.getContext('2d');
const dataArray = [];
let rowArray = [];
let columnArray = [];
let columnsCounter = 0;
let isDrawing = false;
let distances;
let bestIndexes = [];
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
const findDistanceBetweenOnes = (array1, array2) => {
    let distance = Infinity;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] === 1) {
            for (let j = 0; j < array2.length; j++) {
                if (array2[j] === 1) {
                    distance = Math.min(distance, Math.abs(i - j));
                }
            }
        }
    }
    return distance === Infinity ? -1 : distance;
};
const findBestMatch = () => {
    let lowestIndex = 0;
    let lowestDistance = distances[0];
    for (let i = 1; i < distances.length; i++) {
        if (distances[i] < lowestDistance) {
            lowestDistance = distances[i];
            lowestIndex = i;
        }
    }
    bestIndexes.push(lowestIndex);
};
const makeArray = () => {
    distances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataArray.length = 0;
    rowArray.length = 0;
    columnArray = [];
    columnsCounter = 0;
    bestIndexes = [];
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
        let totalDistance = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < rowArrays[i].length; j++) {
                const distance = findDistanceBetweenOnes(rowArrays[i][j], dataArray[j]);
                totalDistance += distance === -1 ? 0 : distance;
            }
            distances[i] = totalDistance;
            totalDistance = 0;
            findBestMatch();
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < rowArrays[i].length; j++) {
                const distance = findDistanceBetweenOnes(rowArrays[i][j].slice().reverse(), dataArray[j].slice().reverse());
                totalDistance += distance === -1 ? 0 : distance;
            }
            distances[i] = totalDistance;
            totalDistance = 0;
            findBestMatch();
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < columnArrays[i].length; j++) {
                const distance = findDistanceBetweenOnes(columnArrays[i][j], columnArray[j]);
                totalDistance += distance === -1 ? 0 : distance;
            }
            distances[i] += totalDistance;
            totalDistance = 0;
            findBestMatch();
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < columnArrays[i].length; j++) {
                const distance = findDistanceBetweenOnes(columnArrays[i][j].slice().reverse(), columnArray[j].slice().reverse());
                totalDistance += distance === -1 ? 0 : distance;
            }
            distances[i] += totalDistance;
            totalDistance = 0;
            findBestMatch();
        }
        outputData.textContent = findMostFrequentNumber(bestIndexes).toString();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else {
        console.error(420);
    }
};
function findMostFrequentNumber(arr) {
    const frequencyMap = {};
    for (const num of arr) {
        if (frequencyMap[num]) {
            frequencyMap[num]++;
        }
        else {
            frequencyMap[num] = 1;
        }
    }
    let mostFrequentNumber = arr[0];
    let highestFrequency = frequencyMap[arr[0]] || 0;
    for (const num in frequencyMap) {
        if (frequencyMap[num] > highestFrequency) {
            mostFrequentNumber = Number(num);
            highestFrequency = frequencyMap[num];
        }
    }
    return mostFrequentNumber;
}
//# sourceMappingURL=script.js.map