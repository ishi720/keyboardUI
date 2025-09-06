'use strict';
import KanaKeyboard from './KanaKeyboard.js';
import RomajiKeyboard from './RomajiKeyboard.js';
import HungulKeyboard from './HangulKeyboard.js';


const params = new URLSearchParams(window.location.search);
const keyboardType = params.get("type");

window.onload = () => {

    if (keyboardType === "kana") {
        // かな入力
        const keyboard = new KanaKeyboard("きょうは、りんごをたべる");
        keyboard.init();
    } else if (keyboardType === "romaji") {
        // ローマ字入力
        const keyboard = new RomajiKeyboard("Hello,world!");
        keyboard.init();
    } else if (keyboardType === "hangul") {
        // ハングル入力
        const keyboard = new HungulKeyboard("안녕하세요");
        keyboard.init();
    } else {
        // デフォルトはローマ字入力
        const keyboard = new RomajiKeyboard("Hello,world!");
        keyboard.init();
    }
};