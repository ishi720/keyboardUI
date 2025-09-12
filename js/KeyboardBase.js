'use strict';

export default class KeyboardBase {
    constructor(targetText) {
        this.originalText = targetText;
        this.s = this.originalText;
        this.indexMap = this.createIndexMap(targetText, this.s);
        this.charPos = 0;
        this.isShift = false;
        this.codeList = []; // 継承先でセット
        this.clickStatus = false;
    }

    /**
     * 初期化処理
     */
    init() {
        this.setInnerText('key');
        this.renderInputText();
        this.renderOriginalText();

        // 最初のキーを強調表示
        this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));

        // イベント登録
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // マウスクリックで入力可能にする
        const allKeys = document.querySelectorAll("#keyboard div");
        allKeys.forEach(keyEl => {
            const code = keyEl.classList[0].replace("key_", "");
            keyEl.addEventListener("pointerdown", () => this.keyClickStart(code));
            keyEl.addEventListener("pointerout", () => this.keyClickEnd(code));
            keyEl.addEventListener("pointerup", () => this.keyClickEnd(code));
        });
    }

    /**
     * 入力用テキストを画面に描画
     */
    renderInputText() {
        this.renderText("inputKeywordDisplay", this.s, "char");
    }

    /**
     * オリジナル文字列を画面に描画
     */
    renderOriginalText() {
        this.renderText("originalTextDisplay", this.originalText, "org_char");
    }

    /**
     * 指定したコンテナにテキストを描画
     * @param {string} containerId コンテナのID
     * @param {string} text 描画するテキスト
     * @param {string} prefix span要素のID接頭辞
     * @return {void}
     */
    renderText(containerId, text, prefix) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.innerText = text.charAt(i);
            span.id = `${prefix}_${i}`;
            span.className = "coordinate";
            container.appendChild(span);
        }
    }

    /**
     * キーダウンイベント処理
     */
    handleKeyDown(e) {
        if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
            this.isShift = true;
            this.setInnerText('keyShift');
            this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));
        }

        // 入力文字と押されたキーが一致するか判定
        const char = this.s.charAt(this.charPos);
        if (char && this.getKeyCode(char) === e.code) {
            this.handleCorrectKey();
        }

        // 押下中のキーを強調表示
        const nowKey = document.getElementsByClassName('key_' + e.code);
        for (const key of nowKey) {
            key.classList.add("active");
        }
    }

    /**
     * キーアップイベント処理
     */
    handleKeyUp(e) {
        // Shiftキーが離された場合
        if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
            this.isShift = false;
            this.setInnerText('key');
            this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));
        }

        // 押下中のキーの強調表示をクリア
        const nowKey = document.getElementsByClassName('key_' + e.code);
        for (const key of nowKey) {
            key.classList.remove("active");
        }
    }

    /**
     * マウスクリックでキーを押したときの処理
     */
    keyClickStart(code) {
        const char = this.s.charAt(this.charPos);
        const keyObj = this.codeList.find(d => (this.isShift ? d.keyShift : d.key) === char);
        if (keyObj && keyObj.code === code) {
            this.handleCorrectKey();
        }
        const nowKey = document.getElementsByClassName('key_' + code);
        for (const key of nowKey) {
            key.classList.add("active");
        }
        this.clickStatus = true;
    }

    /**
     * マウスクリックでキーを離したときの処理
     */
    keyClickEnd(code) {
        if (!this.clickStatus) return;

        const char = this.s.charAt(this.charPos);
        const keyObj = this.codeList.find(d => (this.isShift ? d.keyShift : d.key) === char);
        if (keyObj && keyObj.code === code) {
            this.handleCorrectKey();
        }
        const nowKey = document.getElementsByClassName('key_' + code);
        for (const key of nowKey) {
            key.classList.remove("active");
        }
        this.clickStatus = false;
    }

    /**
     * 正しくキーを押されたときの処理
     */
    handleCorrectKey() {
        // 入力済みにする
        const char = document.getElementById("char_" + this.charPos);
        char.classList.remove("coordinate");
        char.setAttribute("class", "done");

        // オリジナルテキストは、入力文字の最後に完了とする
        const originalIndex = this.indexMap.findIndex(arr => arr.includes(this.charPos));
        if (originalIndex !== -1) {
            const arr = this.indexMap[originalIndex];
            const isLast = arr[arr.length - 1] === this.charPos; // 最後の分離文字かどうか判定
            if (isLast) {
                const orgChar = document.getElementById("org_char_" + originalIndex);
                if (orgChar) {
                    orgChar.classList.remove("coordinate");
                    orgChar.setAttribute("class", "done");
                }
            }
        }

        // 次の文字へ移動
        this.charPos++;

        // 次のキーを強調表示
        if (this.charPos < this.s.length) {
            const char = this.s.charAt(this.charPos);
            const key = this.getKeyCode(char);
            this.coordinateNextKey(key === null ? 'ShiftLeft' : key);
        } else {
            this.inputReset();
        }
    }

    /**
     * 入力をリセット
     */
    inputReset() {
        // 複数テキストがある場合は次のテキストへ
        if (this.inputList && this.inputList.length > 1) {
            this.currentIndex = (this.currentIndex + 1) % this.inputList.length;
            this.originalText = this.inputList[this.currentIndex];
            this.s = this.inputList[this.currentIndex];
            this.indexMap = this.createIndexMap(this.originalText, this.s);
        }

        // リセット処理
        this.charPos = 0;
        const inputText = document.querySelectorAll("#inputKeywordDisplay span");
        inputText.forEach(span => span.setAttribute("class", "coordinate"));
        // 赤い強調もクリア
        this.clearNextChar();
        // オリジナルテキストもリセット
        const originalText = document.querySelectorAll("#originalTextDisplay span");
        originalText.forEach(span => span.setAttribute("class", "coordinate"));
        // 分解済みテキストもリセット
        this.decomposeText();
        // 次のキーを強調表示

        // 描画更新
        this.renderInputText();
        this.renderOriginalText();
        this.clearNextKey();
        this.setInnerText('key');
        this.isShift = false;
        this.clickStatus = false;
        this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));
    }

    /**
     * 次に入力するキーを強調表示
     */
    coordinateNextKey(keyCode) {
        this.clearNextKey();
        if (keyCode) {
            const nextKey = document.getElementsByClassName('key_' + keyCode);
            if (nextKey[0]) nextKey[0].classList.add("next");
        }

        // 次に入力する文字を強調表示
        this.clearNextChar();
        const nextChar = document.getElementById("char_" + this.charPos);
        if (nextChar) {
            nextChar.classList.add("next-char");
        }

        // オリジナルテキストの対応する文字も強調表示
        const originalIndex = this.indexMap.findIndex(arr => arr.includes(this.charPos));
        if (originalIndex !== -1) {
            const orgChar = document.getElementById("org_char_" + originalIndex);
            if (orgChar) orgChar.classList.add("next-char");
        }
    }

    /**
     * 次の入力文字の強調表示をクリア
     */
    clearNextChar() {
        const allChars = document.querySelectorAll("#inputKeywordDisplay span");
        allChars.forEach(span => span.classList.remove("next-char"));

        const originalChars = document.querySelectorAll("#originalTextDisplay span");
        originalChars.forEach(span => span.classList.remove("next-char"));
    }

    /**
     * 全キーの強調表示をクリア
     */
    clearNextKey() {
        const allKey = document.querySelectorAll("#keyboard div");
        allKey.forEach(key => key.classList.remove("next"));
    }

    /**
     * 文字に対応するキーコードを取得
     */
    getKeyCode(char) {
        const key = this.codeList.find(d => this.isShift ? d.keyShift === char : d.key === char);
        return key ? key.code : null;
    }

    /**
     * キーリストに基づいて表示を更新
     */
    setInnerText(v) {
        this.codeList.forEach(key => {
            const el = document.getElementsByClassName("key_" + key.code)[0];
            if (el) {
                el.innerText = (v === "keyShift" ? key.keyShift : key.key);
            }
        });
    }

    /**
     * オリジナル文字列と分離済み文字列のインデックス対応表を作成
     */
    createIndexMap(original, separated) {
        const map = [];
        let sepIndex = 0;
        for (let i = 0; i < original.length; i++) {
            const baseChar = original.charAt(i).normalize('NFD');
            const length = baseChar.length;
            const arr = [];
            for (let j = 0; j < length; j++) {
                arr.push(sepIndex++);
            }
            map.push(arr);
        }
        return map;
    }

    /**
     * 入力用テキストをリセット
     */
    decomposeText() {
        this.s = this.originalText;
    }
}
