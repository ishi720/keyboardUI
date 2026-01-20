'use strict';
import KanaKeyboard from './KanaKeyboard.js';
import AlphabetKeyboard from './AlphabetKeyboard.js';
import HangulKeyboard from './HangulKeyboard.js';
import FrenchAZERTYKeyboard from './FrenchAZERTYKeyboard.js';
import ItalianQWERTYKeyboard from './ItalianQWERTYKeyboard.js';

const params = new URLSearchParams(window.location.search);
const keyboardType = params.get("type");

const DEFAULT_TYPE = "alphabet";

// キーボードクラスのマッピング
const keyboardClasses = {
    kana: KanaKeyboard,
    alphabet: AlphabetKeyboard,
    hangul: HangulKeyboard,
    FrenchAZERTY: FrenchAZERTYKeyboard,
    ItalianQWERTY: ItalianQWERTYKeyboard
};

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
    return texts[type] || texts[DEFAULT_TYPE];
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
    const KeyboardClass = keyboardClasses[keyboardType] || keyboardClasses[DEFAULT_TYPE];
    keyboard = new KeyboardClass(text);
    keyboard.inputList = inputList;
    keyboard.currentIndex = currentIndex;
    keyboard.init();
}