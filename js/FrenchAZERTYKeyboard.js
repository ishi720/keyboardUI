'use strict';
import KeyboardBase from './KeyboardBase.js';

// フランスAZERTY（アザーティー）配列のキーボードクラス
export default class FrenchAZERTYKeyboard extends KeyboardBase {
    constructor(targetText) {
        super(targetText);

        this.codeList = [
            { code: "Digit1", key: "&", keyShift: "1" },
            { code: "Digit2", key: "é", keyShift: "2" },
            { code: "Digit3", key: "\"", keyShift: "3" },
            { code: "Digit4", key: "'", keyShift: "4" },
            { code: "Digit5", key: "(", keyShift: "5" },
            { code: "Digit6", key: "-", keyShift: "6" },
            { code: "Digit7", key: "è", keyShift: "7" },
            { code: "Digit8", key: "_", keyShift: "8" },
            { code: "Digit9", key: "ç", keyShift: "9" },
            { code: "Digit0", key: "à", keyShift: "0" },
            { code: "Minus", key: ")", keyShift: "°" },
            { code: "Equal", key: "=", keyShift: "+" },
            { code: "IntlYen", key: "", keyShift: "" },

            { code: "KeyQ", key: "a", keyShift: "A" },
            { code: "KeyW", key: "z", keyShift: "Z" },
            { code: "KeyE", key: "e", keyShift: "E" },
            { code: "KeyR", key: "r", keyShift: "R" },
            { code: "KeyT", key: "t", keyShift: "T" },
            { code: "KeyY", key: "y", keyShift: "Y" },
            { code: "KeyU", key: "u", keyShift: "U" },
            { code: "KeyI", key: "i", keyShift: "I" },
            { code: "KeyO", key: "o", keyShift: "O" },
            { code: "KeyP", key: "p", keyShift: "P" },
            { code: "BracketLeft", key: "", keyShift: "" },
            { code: "BracketRight", key: "$", keyShift: "+" },

            { code: "KeyA", key: "q", keyShift: "Q" },
            { code: "KeyS", key: "s", keyShift: "S" },
            { code: "KeyD", key: "d", keyShift: "D" },
            { code: "KeyF", key: "f", keyShift: "F" },
            { code: "KeyG", key: "g", keyShift: "G" },
            { code: "KeyH", key: "h", keyShift: "H" },
            { code: "KeyJ", key: "j", keyShift: "J" },
            { code: "KeyK", key: "k", keyShift: "K" },
            { code: "KeyL", key: "l", keyShift: "L" },
            { code: "Semicolon", key: "m", keyShift: "M" },
            { code: "Quote", key: "ù", keyShift: "%" },
            { code: "Backslash", key: "*", keyShift: "µ" },

            { code: "KeyZ", key: "w", keyShift: "W" },
            { code: "KeyX", key: "x", keyShift: "X" },
            { code: "KeyC", key: "c", keyShift: "C" },
            { code: "KeyV", key: "v", keyShift: "V" },
            { code: "KeyB", key: "b", keyShift: "B" },
            { code: "KeyN", key: "n", keyShift: "N" },
            { code: "KeyM", key: ",", keyShift: "?" },
            { code: "Comma", key: ";", keyShift: "." },
            { code: "Period", key: ":", keyShift: "/" },
            { code: "Slash", key: "!", keyShift: "§" },
            { code: "IntlRo", key: "", keyShift: "" },

            { code: "Space", key: " ", keyShift: " "}
        ];
    }
}