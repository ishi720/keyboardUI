'use strict';
import KeyboardBase from './KeyboardBase.js';

export default class HangulKeyboard extends KeyboardBase {
    constructor(targetText) {
        super(targetText);
        this.currentText = this.#decomposeHangul(targetText);

        this.codeList = [
            { code: "Digit1", key: "1", keyShift: "!" },
            { code: "Digit2", key: "2", keyShift: "@" },
            { code: "Digit3", key: "3", keyShift: "#" },
            { code: "Digit4", key: "4", keyShift: "$" },
            { code: "Digit5", key: "5", keyShift: "%" },
            { code: "Digit6", key: "6", keyShift: "^" },
            { code: "Digit7", key: "7", keyShift: "&" },
            { code: "Digit8", key: "8", keyShift: "*" },
            { code: "Digit9", key: "9", keyShift: "(" },
            { code: "Digit0", key: "0", keyShift: ")" },
            { code: "Minus", key: "-", keyShift: "_" },
            { code: "Equal", key: "=", keyShift: "+" },
            { code: "IntlYen", key: "", keyShift: "" },

            { code: "KeyQ", key: "ㅂ", keyShift: "ㅃ" },
            { code: "KeyW", key: "ㅈ", keyShift: "ㅉ" },
            { code: "KeyE", key: "ㄷ", keyShift: "ㄸ" },
            { code: "KeyR", key: "ㄱ", keyShift: "ㄲ" },
            { code: "KeyT", key: "ㅅ", keyShift: "ㅆ" },
            { code: "KeyY", key: "ㅛ", keyShift: "ㅛ" },
            { code: "KeyU", key: "ㅕ", keyShift: "ㅕ" },
            { code: "KeyI", key: "ㅑ", keyShift: "ㅑ" },
            { code: "KeyO", key: "ㅐ", keyShift: "ㅒ" },
            { code: "KeyP", key: "ㅔ", keyShift: "ㅖ" },
            { code: "BracketLeft", key: "[", keyShift: "{" },
            { code: "BracketRight", key: "]", keyShift: "}" },

            { code: "KeyA", key: "ㅁ", keyShift: "ㅁ" },
            { code: "KeyS", key: "ㄴ", keyShift: "ㄴ" },
            { code: "KeyD", key: "ㅇ", keyShift: "ㅇ" },
            { code: "KeyF", key: "ㄹ", keyShift: "ㄹ" },
            { code: "KeyG", key: "ㅎ", keyShift: "ㅎ" },
            { code: "KeyH", key: "ㅗ", keyShift: "ㅗ" },
            { code: "KeyJ", key: "ㅓ", keyShift: "ㅓ" },
            { code: "KeyK", key: "ㅏ", keyShift: "ㅏ" },
            { code: "KeyL", key: "ㅣ", keyShift: "ㅣ" },
            { code: "Semicolon", key: ";", keyShift: ":" },
            { code: "Quote", key: "'", keyShift: "\"" },
            { code: "Backslash", key: "\\", keyShift: "|" },

            { code: "KeyZ", key: "ㅋ", keyShift: "ㅋ" },
            { code: "KeyX", key: "ㅌ", keyShift: "ㅌ" },
            { code: "KeyC", key: "ㅊ", keyShift: "ㅊ" },
            { code: "KeyV", key: "ㅍ", keyShift: "ㅍ" },
            { code: "KeyB", key: "ㅠ", keyShift: "ㅠ" },
            { code: "KeyN", key: "ㅜ", keyShift: "ㅜ" },
            { code: "KeyM", key: "ㅡ", keyShift: "ㅡ" },
            { code: "Comma", key: ",", keyShift: "<" },
            { code: "Period", key: ".", keyShift: ">" },
            { code: "Slash", key: "/", keyShift: "?" },
            { code: "IntlRo", key: "", keyShift: "" },

            { code: "Space", key: " ", keyShift: " "}
        ];
    }

    /**
     * 分解済みテキストをリセット
     */
    decomposeText() {
        this.currentText = this.#decomposeHangul(this.originalText);
    }

    /**
     * ハングル分解
     */
    #decomposeHangul(text) {
        const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
        const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

        // 複数文字対応: 1文字ずつ分解して配列にする
        const result = Array.from(text).map(char => {
            const code = char.charCodeAt(0);
            if (code < 0xAC00 || code > 0xD7A3) {
                return char;
            }
            // ハングル文字の分解
            const SIndex = code - 0xAC00;
            const choIndex = Math.floor(SIndex / (21 * 28));
            const jungIndex = Math.floor((SIndex % (21 * 28)) / 28);
            const jongIndex = SIndex % 28;

            // 分解した文字を結合して返す
            return CHO[choIndex] + JUNG[jungIndex] + JONG[jongIndex];
        });

        // 配列を結合して文字列として返す
        return result.join('');
    }
}