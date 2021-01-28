const GIFEncoder = require('gifencoder');
const { createCanvas, Image, ImageData, createImageData } = require('canvas');
const decodeGif = require("decode-gif");
const fs = require('fs');
const axios = require('axios');

async function createGIFMemeFromFile(path, upperText, lowerText) {
    let image = fs.readFileSync(path);
    let gif = decodeGif(image);
    // createGIFMeme(image, gif.width, gif.height, upperText, lowerText);
    console.log("Generating meme...");
    await createGIFMeme(image, 320, 240, upperText, lowerText);
}

async function createGIFMemeFromURL(url, upperText, lowerText) {
    axios.get(url, { responseType: 'arraybuffer' })
        .then(async response => {
            if (response.status = 200) {
                let image = response.data;
                let gif = decodeGif(image);
                // createGIFMeme(image, gif.width, gif.height, upperText, lowerText);
                console.log("Image fetched. Generating meme...");
                await createGIFMeme(image, gif.width / gif.height * 240, 240, upperText, lowerText);
            }
        })
        .catch(error => {
            console.log("Error: " + error.code);
            if (error.code == "ENOTFOUND") {
                console.log("Cannot get the requested file");
            }
        });
    console.log("Fetching image...");
}

async function createGIFMeme(image, width, height, upperText, lowerText) {
    let encoder = new GIFEncoder(width, height);
    
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream('output.gif'));
    
    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setQuality(20); // image quality. 10 is default.
    
    // use node-canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    let gif = decodeGif(image);
    let length = gif.frames.length
    encoder.setDelay(gif.frames[1].timeCode - gif.frames[0].timeCode);
    
    gif.frames.forEach(frame => {
        let frameData = createImageData(frame.data, gif.width, gif.height);
        ctx.drawImage(imageDataAsCanvas(frameData), 0, 0, width, height);
        textFunc(ctx, upperText, "top", 40);
        textFunc(ctx, lowerText, "bottom", 40);
        encoder.addFrame(ctx);
    });
    
    encoder.finish();
    console.log("Meme generated.");
}

function textFunc(ctx, text, pos = "top", size = 30, offset = 5) {
    ctx.font = size + 'px Impact';

    let textMeasure = ctx.measureText(text);
    let xPos = ctx.canvas.width/2 - (textMeasure.width/2);
    let yPos;
    if (pos == "top") {
        yPos = textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent + offset;
    } else {
        yPos = ctx.canvas.height - offset;
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, xPos, yPos);

    ctx.strokeStyle = '#000000';
    ctx.strokeText(text, xPos, yPos);
}

function imageDataAsCanvas(imageData) {
    let canvas = createCanvas(imageData.width, imageData.height);
    let ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

module.exports = {
    createGIFMeme: createGIFMeme,
    createGIFMemeFromFile: createGIFMemeFromFile,
    createGIFMemeFromURL: createGIFMemeFromURL
}