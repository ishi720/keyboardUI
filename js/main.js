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

function getTextsByType(type) {
    if (type === "kana") return texts.kana;
    if (type === "romaji") return texts.romaji;
    if (type === "hangul") return texts.hangul;
    return texts.romaji;
}

window.onload = () => {
    const inputList = getTextsByType(keyboardType);
    createKeyboard(inputList[currentIndex]);

    // KeyboardBaseのinputResetを拡張
    keyboard.inputReset = function() {
        currentIndex = (currentIndex + 1) % inputList.length;
        this.originalText = inputList[currentIndex];
        this.s = inputList[currentIndex];
        this.indexMap = this.createIndexMap(this.originalText, this.s);
        this.charPos = 0;
        this.renderInputText();
        this.renderOriginalText();
        this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));
    };
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
    keyboard.init();
}