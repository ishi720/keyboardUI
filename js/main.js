'use strict';
import KanaKeyboard from './KanaKeyboard.js';
import RomajiKeyboard from './RomajiKeyboard.js';
import HungulKeyboard from './HangulKeyboard.js';

const params = new URLSearchParams(window.location.search);
const keyboardType = params.get("type");

// 入力テキストの配列
const texts = {
    kana: ["きょうは、りんごをたべる", "こんにちはせかい"],
    romaji: ["Hello world!", "Good morning!", "I have a pen."],
    hangul: ["안녕하세요", "감사합니다"]
};

let currentIndex = 0;
let keyboard = null;
let inputList = [];

function getTextsByType(type) {
    if (type === "kana") return texts.kana;
    if (type === "romaji") return texts.romaji;
    if (type === "hangul") return texts.hangul;
    return texts.romaji;
}

window.onload = () => {
    inputList = getTextsByType(keyboardType);
    createKeyboard(inputList[currentIndex]);
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", () => {
        keyboard.startTyping();
        startBtn.style.display = 'none';
    });
};

function createKeyboard(text) {
    if (keyboardType === "kana") {
        keyboard = new KanaKeyboard(text);
    } else if (keyboardType === "romaji") {
        keyboard = new RomajiKeyboard(text);
    } else if (keyboardType === "hangul") {
        keyboard = new HungulKeyboard(text);
    } else {
        keyboard = new RomajiKeyboard(text);
    }
    keyboard.inputList = inputList;
    keyboard.currentIndex = currentIndex;
    keyboard.init();
}