'use strict';

/**
 * キーボードの基底クラス
 */
export default class KeyboardBase {
    constructor(targetText) {
        this.originalText = targetText; // オリジナルテキスト
        this.currentText = this.originalText; // 入力用テキスト
        this.isKeyboardAssist = true; // 入力補助ON（デフォルト）
        this.indexMap = this.#createIndexMap(targetText, this.currentText); // 文字ののインデックス対応表
        this.charPos = 0; // 入力中の文字位置
        this.isShift = false; // Shiftキー押下中フラグ
        this.codeList = []; // キーリスト
        this.clickStatus = false; // マウスクリック押下中フラグ
        this.isTyping = false; // タイピング中フラグ
        this.correctCount = 0; // 正解キー数
        this.missCount = 0; // ミスタイプ数

        this.startTime = null;
        this.timerId = null;
        this.dom = {
            timerDisplay: document.getElementById("timerDisplay"),
            correctDisplay: document.getElementById("correctCountDisplay"),
            missDisplay: document.getElementById("missCountDisplay")
        };
    }

    /**
     * 初期化処理
     */
    init() {
        // キーボードの描画
        this.#setKeyboardText('key');

        // イベント登録
        document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.#handleKeyUp(e));

        // マウスクリックで入力可能にする
        const allKeys = document.querySelectorAll("#keyboard div");
        allKeys.forEach(keyEl => {
            const code = keyEl.classList[0].replace("key_", "");
            keyEl.addEventListener("pointerdown", () => this.#keyClickStart(code));
            keyEl.addEventListener("pointerout", () => this.#keyClickEnd(code));
            keyEl.addEventListener("pointerup", () => this.#keyClickEnd(code));
        });

        // チェックボックスのON/OFF切り替え
        const assistChk = document.getElementById("toggleAssistChk");
        if (assistChk) {
            assistChk.addEventListener("change", (e) => {
                this.setKeyboardAssist(e.target.checked);
            });
        }
    }
    /**
     * タイピング開始
     */
    startTyping() {
        this.isTyping = true;
        this.#renderInputText();
        this.#renderOriginalText();

        // タイマー開始
        this.startTime = Date.now();
        this.#startTimer();

        // 最初のキーを強調表示
        this.#coordinateNextKey(
            this.#getKeyCode(this.currentText.charAt(this.charPos)) === null ? 'ShiftLeft' : this.#getKeyCode(this.currentText.charAt(this.charPos))
        );
    }
    /**
     * タイマーを開始
     */
    #startTimer() {
        if (!this.dom.timerDisplay) return;

        // 既存のタイマーをクリア
        clearInterval(this.timerId);

        this.timerId = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            this.dom.timerDisplay.innerText = `Time: ${elapsed.toFixed(2)} 秒`;
        }, 10);
    }

    /**
     * タイマーを停止
     */
    #stopTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    /**
     * タイマーをリセット
     */
    #resetTimer() {
        this.#stopTimer();
        this.startTime = null;
        if (this.dom.timerDisplay) {
            this.dom.timerDisplay.innerText = "Time: 0.00 秒";
        }
    }

    /**
     * 入力用テキストを画面に描画
     */
    #renderInputText() {
        this.#renderText("inputKeywordDisplay", this.currentText, "char");
    }

    /**
     * オリジナル文字列を画面に描画
     */
    #renderOriginalText() {
        this.#renderText("originalTextDisplay", this.originalText, "org_char");
    }

    /**
     * 指定したコンテナにテキストを描画
     * @param {string} containerId コンテナのID
     * @param {string} text 描画するテキスト
     * @param {string} prefix span要素のID接頭辞
     * @return {void}
     */
    #renderText(containerId, text, prefix) {
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
    #handleKeyDown(e) {
        // 長押し入力はスキップ
        if (e.repeat) return;

        if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
            this.#setShiftState(true);
        }

        // 入力文字と押されたキーが一致するか判定
        const char = this.currentText.charAt(this.charPos);

        if (this.isTyping) {
            if (char && this.#getKeyCode(char) === e.code) {
                this.#handleCorrectKey();
            } else if (char && e.code !== "ShiftRight" && e.code !== "ShiftLeft") {
                // 間違いカウント
                this.missCount++;
                this.#updateScore();
            }
        }
        // 押下中のキーを強調表示
        this.#toggleKeyActive(e.code, true);
    }

    /**
     * キーアップイベント処理
     */
    #handleKeyUp(e) {
        // Shiftキーが離された場合
        if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
            this.#setShiftState(false);
        }

        // 押下中のキーの強調表示をクリア
        this.#toggleKeyActive(e.code, false);
    }

    /**
     * マウスクリックでキーを押したときの処理
     */
    #keyClickStart(code) {
        if (code === "ShiftRight" || code === "ShiftLeft") {
            this.#setShiftState(true);
        }
        if (this.startTyping) {
            this.#toggleKeyActive(code, true);
            this.clickStatus = true;
        }
    }

    /**
     * マウスクリックでキーを離したときの処理
     */
    #keyClickEnd(code) {
        if (!this.clickStatus) return;

        const char = this.currentText.charAt(this.charPos);
        const keyObj = this.codeList.find(d => (this.isShift ? d.keyShift : d.key) === char);
        if (this.isTyping) {
            if (keyObj && keyObj.code === code) {
                this.#handleCorrectKey();
            } else if (code == "ShiftRight" || code == "ShiftLeft") {
                this.#setShiftState(false);
            } else {
                this.missCount++;
                this.#updateScore();
            }
        }
        // 押下中のキーの強調表示をクリア
        this.#toggleKeyActive(code, false);
        this.clickStatus = false;
    }

    /**
     * 正しくキーを押されたときの処理
     */
    #handleCorrectKey() {
        if (this.isTyping) {
            // 正解カウント
            this.correctCount++;
            this.#updateScore();
        }

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
        if (this.charPos < this.currentText.length) {
            const char = this.currentText.charAt(this.charPos);
            const key = this.#getKeyCode(char);
            this.#coordinateNextKey(key === null ? 'ShiftLeft' : key);
        } else {
            this.#inputReset();
        }
    }

    // キーの強調表示・解除
    #toggleKeyActive(code, isActive) {
        const keys = document.getElementsByClassName('key_' + code);
        for (const key of keys) {
            key.classList.toggle("active", isActive);
        }
    }

    /**
     * 入力をリセット
     */
    #inputReset() {

        // 全てのテキストを入力し終えた場合は終了
        if (this.currentIndex >= this.inputList.length - 1) {
            // タイマーを止める
            this.#stopTimer();
            // タイピング終了
            this.isTyping = false;
            // 強調表示をクリア
            this.#clearNextKey();
            this.#clearNextChar();

            const retryBtn = document.getElementById("retryBtn");

            // 「リトライ」ボタンを表示
            retryBtn.style.display = '';

            // 「リトライ」ボタンクリックで最初に戻る
            retryBtn.addEventListener("click", () => {
                // 初期状態に戻す
                this.currentIndex = 0;
                this.originalText = this.inputList[0];
                this.currentText = this.inputList[0];
                this.indexMap = this.#createIndexMap(this.originalText, this.currentText);
                this.charPos = 0;
                retryBtn.style.display = 'none';

                // 表示をリセット
                this.#renderInputText();
                this.#renderOriginalText();

                // スコアリセット
                this.correctCount = 0;
                this.missCount = 0;
                this.#updateScore();

                // タイマーリセット
                this.#resetTimer();

                // 再スタート
                this.startTyping();
            });

            return;
        }

        // 複数テキストがある場合は次のテキストへ
        this.currentIndex = (this.currentIndex + 1) % this.inputList.length;
        this.originalText = this.inputList[this.currentIndex];
        this.currentText = this.inputList[this.currentIndex];
        this.indexMap = this.#createIndexMap(this.originalText, this.currentText);

        // リセット処理
        this.charPos = 0;
        const inputText = document.querySelectorAll("#inputKeywordDisplay span");
        inputText.forEach(span => span.setAttribute("class", "coordinate"));
        // 赤い強調もクリア
        this.#clearNextChar();
        // オリジナルテキストもリセット
        const originalText = document.querySelectorAll("#originalTextDisplay span");
        originalText.forEach(span => span.setAttribute("class", "coordinate"));
        // 分解済みテキストもリセット
        this.decomposeText();

        // 描画更新
        this.#renderInputText();
        this.#renderOriginalText();
        this.#clearNextKey();
        this.isShift = false;
        this.clickStatus = false;
        this.#setKeyboardText('key');
        // 次のキーを強調表示
        this.#coordinateNextKey(
            this.#getKeyCode(this.currentText.charAt(this.charPos)) === null ? 'ShiftLeft' : this.#getKeyCode(this.currentText.charAt(this.charPos))
        );
    }

    /**
     * 次に入力するキーを強調表示
     */
    #coordinateNextKey(keyCode) {
        // 次に入力するキーを強調表示
        if (this.isKeyboardAssist) {
            this.#clearNextKey();
            if (keyCode) {
                const nextKey = document.getElementsByClassName('key_' + keyCode);
                if (nextKey[0]) nextKey[0].classList.add("next");
            }
        }

        // 次に入力する文字を強調表示
        this.#clearNextChar();
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
    #clearNextChar() {
        const allChars = document.querySelectorAll("#inputKeywordDisplay span");
        allChars.forEach(span => span.classList.remove("next-char"));

        const originalChars = document.querySelectorAll("#originalTextDisplay span");
        originalChars.forEach(span => span.classList.remove("next-char"));
    }

    /**
     * 全キーの強調表示をクリア
     */
    #clearNextKey() {
        const allKey = document.querySelectorAll("#keyboard div");
        allKey.forEach(key => key.classList.remove("next"));
    }

    /**
     * 文字に対応するキーコードを取得
     */
    #getKeyCode(char) {
        const key = this.codeList.find(d => this.isShift ? d.keyShift === char : d.key === char);
        return key ? key.code : null;
    }

    /**
     * キーリストに基づいて表示を更新
     */
    #setKeyboardText(v) {
        this.codeList.forEach(key => {
            const el = document.getElementsByClassName("key_" + key.code)[0];
            if (el) {
                el.innerText = (v === "keyShift" ? key.keyShift : key.key);
            }
        });
    }

    /**
     * オリジナル文字列と分離済み文字列のインデックス対応表を作成
     * @param {string} original オリジナル文字列
     * @param {string} separated 分離済み文字列
     * @return {Array} インデックス対応表
     */
    #createIndexMap(original, separated) {
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
        this.currentText = this.originalText;
    }

    /**
     * スコアボードを更新
     */
    #updateScore() {
        if (this.dom.correctDisplay) {
            this.dom.correctDisplay.innerText = `正: ${this.correctCount}`;
        }
        if (this.dom.missDisplay) {
            this.dom.missDisplay.innerText = `誤: ${this.missCount}`;
        }
    }

    /**
     * 入力補助のON/OFFを設定
     */
    #setShiftState(isActive) {
        this.isShift = isActive;
        this.#setKeyboardText(isActive ? 'keyShift' : 'key');
        if (this.isTyping) {
            this.#coordinateNextKey(
                this.#getKeyCode(this.currentText.charAt(this.charPos)) ?? 'ShiftLeft'
            );
        }
    }

    /**
     * 入力補助のON/OFFを設定
     */
    setKeyboardAssist(isActive) {
        this.isKeyboardAssist = isActive;

        if (!this.isKeyboardAssist) {
            this.#clearNextKey();
        } else {
            const char = this.currentText.charAt(this.charPos);
            const key = this.#getKeyCode(char);
            this.#coordinateNextKey(key ?? "ShiftLeft");
        }
    }
}
