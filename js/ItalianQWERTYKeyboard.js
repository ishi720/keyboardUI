'use strict';
import KeyboardBase from './KeyboardBase.js';

// イタリア（QWERTY）配列キーボードクラス
export default class ItalianQWERTYKeyboard extends KeyboardBase {
    constructor(targetText) {
        super(targetText);

        this.codeList = [
            { code: "Digit1", key: "1", keyShift: "!" },
            { code: "Digit2", key: "2", keyShift: "\"" },
            { code: "Digit3", key: "3", keyShift: "£" },
            { code: "Digit4", key: "4", keyShift: "$" },
            { code: "Digit5", key: "5", keyShift: "%" },
            { code: "Digit6", key: "6", keyShift: "&" },
            { code: "Digit7", key: "7", keyShift: "/" },
            { code: "Digit8", key: "8", keyShift: "(" },
            { code: "Digit9", key: "9", keyShift: ")" },
            { code: "Digit0", key: "0", keyShift: "=" },
            { code: "Minus", key: "'", keyShift: "?" },
            { code: "Equal", key: "ì", keyShift: "^" },
            { code: "IntlYen", key: "", keyShift: "" },

            { code: "KeyQ", key: "q", keyShift: "Q" },
            { code: "KeyW", key: "w", keyShift: "W" },
            { code: "KeyE", key: "e", keyShift: "E" },
            { code: "KeyR", key: "r", keyShift: "R" },
            { code: "KeyT", key: "t", keyShift: "T" },
            { code: "KeyY", key: "y", keyShift: "Y" },
            { code: "KeyU", key: "u", keyShift: "U" },
            { code: "KeyI", key: "i", keyShift: "I" },
            { code: "KeyO", key: "o", keyShift: "O" },
            { code: "KeyP", key: "p", keyShift: "P" },
            { code: "BracketLeft", key: "è", keyShift: "é" },
            { code: "BracketRight", key: "+", keyShift: "*" },

            { code: "KeyA", key: "a", keyShift: "A" },
            { code: "KeyS", key: "s", keyShift: "S" },
            { code: "KeyD", key: "d", keyShift: "D" },
            { code: "KeyF", key: "f", keyShift: "F" },
            { code: "KeyG", key: "g", keyShift: "G" },
            { code: "KeyH", key: "h", keyShift: "H" },
            { code: "KeyJ", key: "j", keyShift: "J" },
            { code: "KeyK", key: "k", keyShift: "K" },
            { code: "KeyL", key: "l", keyShift: "L" },
            { code: "Semicolon", key: "ò", keyShift: "ç" },
            { code: "Quote", key: "à", keyShift: "°" },
            { code: "Backslash", key: "ù", keyShift: "§" },

            { code: "KeyZ", key: "z", keyShift: "Z" },
            { code: "KeyX", key: "x", keyShift: "X" },
            { code: "KeyC", key: "c", keyShift: "C" },
            { code: "KeyV", key: "v", keyShift: "V" },
            { code: "KeyB", key: "b", keyShift: "B" },
            { code: "KeyN", key: "n", keyShift: "N" },
            { code: "KeyM", key: "m", keyShift: "M" },
            { code: "Comma", key: ",", keyShift: ";" },
            { code: "Period", key: ".", keyShift: ":" },
            { code: "Slash", key: "-", keyShift: "_" },
            { code: "IntlRo", key: "", keyShift: "" },

            { code: "Space", key: " ", keyShift: " "}
        ];
    }
}