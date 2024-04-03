const btn = document.getElementById('btn') as HTMLButtonElement
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const dataArray: number[][] = []
let rowArray: number[] = []
let columnsCounter: number = 0
let isDrawing: boolean = false

btn.addEventListener('click', (): void => {
    makeArray()
})
if (ctx) {
    canvas.addEventListener('mousedown', (e: MouseEvent): void => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mousemove', (e: MouseEvent): void => {
        if (isDrawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', (): void => {
        isDrawing = false
    })
} else {
    console.log(69)
}

const makeArray = (): void => {
    if (ctx) {
        const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData: Uint8ClampedArray = imageData.data;
        for (let i: number = 0; i < pixelData.length; i += 4) {
            columnsCounter += 1
            if (columnsCounter === 100) {
                columnsCounter = 0
                dataArray.push(rowArray)
                rowArray = []
            }
            const pixelSum: number = pixelData[i] + pixelData[i + 1] + pixelData[i + 2] + pixelData[i + 3];
            rowArray.push(pixelSum === 0 ? 0 : 1);
        }
        console.log(dataArray);
    } else {
        console.error('2D rendering context not supported');
    }
}

