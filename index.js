const { createGIFMeme, createGIFMemeFromFile, createGIFMemeFromURL } = require("./create-gif-meme");
const axios = require('axios');
const fs = require('fs');

// TODO:
// Add settings
//  - Customizable width/height
//  - Customizable text size
//  - Customizable style
//  - JSON styling
let url = 'images/image.gif';
let upperText = "HELLO";
let lowerText = "WORLD!";

process.argv.forEach(function (val, index, array) {
    if (index === 2) {
        url = val;
    } else if (index === 3) {
        upperText = val;
    } else if (index === 4) {
        lowerText = val;
    }
});

try {
    let link = new URL(url);
    if (['http:', 'https:'].includes(link.protocol)) {
        createGIFMemeFromURL(url, upperText, lowerText);
    } else {
        createGIFMemeFromFile(url, upperText, lowerText);
    }
} catch (err) {
    createGIFMemeFromFile(url, upperText, lowerText);
}

// createGIFMemeFromFile('images/image.gif', "Hello", "World!");