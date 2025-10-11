'use strict';
import KanaKeyboard from './KanaKeyboard.js';
import AlphabetKeyboard from './AlphabetKeyboard.js';
import HangulKeyboard from './HangulKeyboard.js';
import FrenchAZERTYKeyboard from './FrenchAZERTYKeyboard.js';
import ItalianQWERTYKeyboard from './ItalianQWERTYKeyboard.js';

const params = new URLSearchParams(window.location.search);
const keyboardType = params.get("type");

// 入力テキストの配列
const texts = {
    kana: ["きょうは、りんごをたべる", "こんにちはせかい"],
    alphabet: ["Hello world!", "Good morning!", "I have a pen."],
    hangul: ["안녕하세요", "감사합니다"],
    FrenchAZERTY: ["Bonjour le monde!", "Je mange une pomme."],
    ItalianQWERTY: ["Ciao mondo!", "Mangio una mela."]
};

let currentIndex = 0;
let keyboard = null;
let inputList = [];

function getTextsByType(type) {
    if (type === "kana") return texts.kana;
    if (type === "alphabet") return texts.alphabet;
    if (type === "hangul") return texts.hangul;
    if (type === "FrenchAZERTY") return texts.FrenchAZERTY;
    if (type === "ItalianQWERTY") return texts.ItalianQWERTY;
    return texts.alphabet;
}

document.addEventListener("DOMContentLoaded", () => {
    inputList = getTextsByType(keyboardType);
    createKeyboard(inputList[currentIndex]);
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", () => {
        keyboard.startTyping();
        startBtn.style.display = 'none';
    });
});

function createKeyboard(text) {
    if (keyboardType === "kana") {
        keyboard = new KanaKeyboard(text);
    } else if (keyboardType === "alphabet") {
        keyboard = new AlphabetKeyboard(text);
    } else if (keyboardType === "hangul") {
        keyboard = new HangulKeyboard(text);
    } else if (keyboardType === "FrenchAZERTY") {
        keyboard = new FrenchAZERTYKeyboard(text);
    } else if (keyboardType === "ItalianQWERTY") {
        keyboard = new ItalianQWERTYKeyboard(text);
    } else {
        keyboard = new AlphabetKeyboard(text);
    }
    keyboard.inputList = inputList;
    keyboard.currentIndex = currentIndex;
    keyboard.init();
}