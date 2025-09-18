'use strict';
import KeyboardBase from './KeyboardBase.js';

export default class KanaKeyboard extends KeyboardBase {
    constructor(targetText) {
        super(targetText);
        this.currentText = this.#dakutenSeparation(targetText);

        this.codeList = [
            { code: "Digit1", key: "ぬ", keyShift: "ぬ" },
            { code: "Digit2", key: "ふ", keyShift: "ふ" },
            { code: "Digit3", key: "あ", keyShift: "ぁ" },
            { code: "Digit4", key: "う", keyShift: "ぅ" },
            { code: "Digit5", key: "え", keyShift: "ぇ" },
            { code: "Digit6", key: "お", keyShift: "ぉ" },
            { code: "Digit7", key: "や", keyShift: "ゃ" },
            { code: "Digit8", key: "ゆ", keyShift: "ゅ" },
            { code: "Digit9", key: "よ", keyShift: "ょ" },
            { code: "Digit0", key: "わ", keyShift: "を" },
            { code: "Minus", key: "ほ", keyShift: "ほ" },
            { code: "Equal", key: "へ", keyShift: "へ" },
            { code: "IntlYen", key: "ー", keyShift: "ー" },

            { code: "KeyQ", key: "た", keyShift: "た" },
            { code: "KeyW", key: "て", keyShift: "て" },
            { code: "KeyE", key: "い", keyShift: "ぃ" },
            { code: "KeyR", key: "す", keyShift: "す" },
            { code: "KeyT", key: "か", keyShift: "か" },
            { code: "KeyY", key: "ん", keyShift: "ん" },
            { code: "KeyU", key: "な", keyShift: "な" },
            { code: "KeyI", key: "に", keyShift: "に" },
            { code: "KeyO", key: "ら", keyShift: "ら" },
            { code: "KeyP", key: "せ", keyShift: "せ" },
            { code: "BracketLeft", key: "゛", keyShift: "゛" },
            { code: "BracketRight", key: "゜", keyShift: "「" },

            { code: "KeyA", key: "ち", keyShift: "ち" },
            { code: "KeyS", key: "と", keyShift: "と" },
            { code: "KeyD", key: "し", keyShift: "し" },
            { code: "KeyF", key: "は", keyShift: "は" },
            { code: "KeyG", key: "き", keyShift: "き" },
            { code: "KeyH", key: "く", keyShift: "く" },
            { code: "KeyJ", key: "ま", keyShift: "ま" },
            { code: "KeyK", key: "の", keyShift: "の" },
            { code: "KeyL", key: "り", keyShift: "り" },
            { code: "Semicolon", key: "れ", keyShift: "れ" },
            { code: "Quote", key: "け", keyShift: "け" },
            { code: "Backslash", key: "む", keyShift: "」" },

            { code: "KeyZ", key: "つ", keyShift: "っ" },
            { code: "KeyX", key: "さ", keyShift: "さ" },
            { code: "KeyC", key: "そ", keyShift: "そ" },
            { code: "KeyV", key: "ひ", keyShift: "ひ" },
            { code: "KeyB", key: "こ", keyShift: "こ" },
            { code: "KeyN", key: "み", keyShift: "み" },
            { code: "KeyM", key: "も", keyShift: "も" },
            { code: "Comma", key: "ね", keyShift: "、" },
            { code: "Period", key: "る", keyShift: "。" },
            { code: "Slash", key: "め", keyShift: "・" },
            { code: "IntlRo", key: "ろ", keyShift: "ろ" },

            { code: "Space", key: " ", keyShift: " "}
        ];
    }

    /**
     * 分解済みテキストをリセット
     */
    decomposeText() {
        this.currentText = this.#dakutenSeparation(this.originalText);
    }

    /**
     * 濁点を分離
     */
    #dakutenSeparation(s) {
        return s.normalize('NFD')
            .replace(/\u3099/g, '\u309b')
            .replace(/\u309a/g, '\u309c');
    }
}