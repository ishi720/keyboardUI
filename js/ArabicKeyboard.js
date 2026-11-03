'use strict';
import KeyboardBase from './KeyboardBase.js';

// アラビア語（Arabic 101）配列のキーボードクラス
export default class ArabicKeyboard extends KeyboardBase {
    constructor(targetText) {
        super(targetText);

        // 練習文の表示を右から左（RTL）にする
        ["originalTextDisplay", "inputKeywordDisplay"].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.dir = "rtl";
                el.lang = "ar";
            }
        });

        // ラーム・アリフ（لا など）は1キーで2文字入力されるため、
        // 練習では ل（G）と ا（H）を個別に押す想定
        this.codeList = [
            { code: "Backquote", key: "ذ", keyShift: "ّ" },
            { code: "Digit1", key: "1", keyShift: "!" },
            { code: "Digit2", key: "2", keyShift: "@" },
            { code: "Digit3", key: "3", keyShift: "#" },
            { code: "Digit4", key: "4", keyShift: "$" },
            { code: "Digit5", key: "5", keyShift: "%" },
            { code: "Digit6", key: "6", keyShift: "^" },
            { code: "Digit7", key: "7", keyShift: "&" },
            { code: "Digit8", key: "8", keyShift: "*" },
            { code: "Digit9", key: "9", keyShift: ")" },
            { code: "Digit0", key: "0", keyShift: "(" },
            { code: "Minus", key: "-", keyShift: "_" },
            { code: "Equal", key: "=", keyShift: "+" },
            { code: "IntlYen", key: "", keyShift: "" },

            { code: "KeyQ", key: "ض", keyShift: "َ" },
            { code: "KeyW", key: "ص", keyShift: "ً" },
            { code: "KeyE", key: "ث", keyShift: "ُ" },
            { code: "KeyR", key: "ق", keyShift: "ٌ" },
            { code: "KeyT", key: "ف", keyShift: "لإ" },
            { code: "KeyY", key: "غ", keyShift: "إ" },
            { code: "KeyU", key: "ع", keyShift: "‘" },
            { code: "KeyI", key: "ه", keyShift: "÷" },
            { code: "KeyO", key: "خ", keyShift: "×" },
            { code: "KeyP", key: "ح", keyShift: "؛" },
            { code: "BracketLeft", key: "ج", keyShift: "<" },
            { code: "BracketRight", key: "د", keyShift: ">" },

            { code: "KeyA", key: "ش", keyShift: "ِ" },
            { code: "KeyS", key: "س", keyShift: "ٍ" },
            { code: "KeyD", key: "ي", keyShift: "]" },
            { code: "KeyF", key: "ب", keyShift: "[" },
            { code: "KeyG", key: "ل", keyShift: "لأ" },
            { code: "KeyH", key: "ا", keyShift: "أ" },
            { code: "KeyJ", key: "ت", keyShift: "ـ" },
            { code: "KeyK", key: "ن", keyShift: "،" },
            { code: "KeyL", key: "م", keyShift: "/" },
            { code: "Semicolon", key: "ك", keyShift: ":" },
            { code: "Quote", key: "ط", keyShift: "\"" },
            { code: "Backslash", key: "\\", keyShift: "|" },

            { code: "KeyZ", key: "ئ", keyShift: "~" },
            { code: "KeyX", key: "ء", keyShift: "ْ" },
            { code: "KeyC", key: "ؤ", keyShift: "}" },
            { code: "KeyV", key: "ر", keyShift: "{" },
            { code: "KeyB", key: "لا", keyShift: "لآ" },
            { code: "KeyN", key: "ى", keyShift: "آ" },
            { code: "KeyM", key: "ة", keyShift: "’" },
            { code: "Comma", key: "و", keyShift: "," },
            { code: "Period", key: "ز", keyShift: "." },
            { code: "Slash", key: "ظ", keyShift: "؟" },
            { code: "IntlRo", key: "", keyShift: "" },

            { code: "Space", key: " ", keyShift: " "}
        ];
    }
}
