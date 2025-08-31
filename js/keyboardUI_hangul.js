'use strict';

class Keyboard {
  constructor(targetText, keyboardType = 'hangul') {
    this.keyboardType = keyboardType;
    this.s = targetText;
    this.charPos = 0;
    this.isShift = false;

    // キーリスト
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
      { code: "IntlRo", key: "", keyShift: "" }
    ];
  }

  /**
   * 初期化処理
   */
  init() {
    this.setInnerText('key');
    this.renderInputText();
    this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));

    // イベント登録
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // マウスクリックで入力可能にする
    const allKeys = document.querySelectorAll("#keyboard div");
    allKeys.forEach(keyEl => {
      keyEl.addEventListener("click", () => {
        const code = keyEl.classList[0].replace("key_", ""); // class名からcodeを取得
        this.simulateKeyPress(code);
      });
    });
  }

  /**
   * 入力テキストを画面に描画
   */
  renderInputText() {
    const inputKeywordDisplay = document.getElementById("inputKeywordDisplay");
    inputKeywordDisplay.innerHTML = "";
    for (let i = 0; i < this.s.length; i++) {
      const span = document.createElement("span");
      span.innerText = this.s.charAt(i);
      span.setAttribute("id", "char_" + i);
      span.setAttribute("class", "coordinate");
      inputKeywordDisplay.appendChild(span);
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

    const kana = this.s.charAt(this.charPos);
    if (kana && this.getKeyCode(kana) === e.code) {
      this.handleCorrectKey();
    }

    // 押下中のキーを強調表示
    const nowKey = document.getElementsByClassName('key_' + e.code);
    if (nowKey[0]) {
      nowKey[0].classList.add("active");
    }
    if (e.code === "Enter" && nowKey.length >= 3) {
      nowKey[1].classList.add("active");
      nowKey[2].classList.add("active");
    }
  }

  /**
   * マウスクリックでキーを押したときの処理
   */
  simulateKeyPress(code) {
    // Shiftキーの押下処理はここで不要だが、Shift対応キーの場合はisShiftを考慮
    const kana = this.s.charAt(this.charPos);
    const keyObj = this.codeList.find(d => (this.isShift ? d.keyShift : d.key) === kana);
    if (keyObj && keyObj.code === code) {
      this.handleCorrectKey();
    }

    // 強調表示
    const nowKey = document.getElementsByClassName('key_' + code);
    if (nowKey[0]) nowKey[0].classList.add("active");
    setTimeout(() => { // クリック後にすぐ消す
      if (nowKey[0]) nowKey[0].classList.remove("active");
    }, 150);
  }

  /**
   * 正しくキーを押されたときの処理
   */
  handleCorrectKey() {
    const char = document.getElementById("char_" + this.charPos);
    char.classList.remove("coordinate");
    char.setAttribute("class", "done");
    this.charPos++;

    if (this.charPos < this.s.length) {
      const kana = this.s.charAt(this.charPos);
      const key = this.getKeyCode(kana);
      this.coordinateNextKey(key === null ? 'ShiftLeft' : key);
    } else {
      this.inputReset();
    }
  }

  /**
   * キーアップイベント処理
   */
  handleKeyUp(e) {
    if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
      this.isShift = false;
      this.setInnerText('key');
      this.coordinateNextKey(this.getKeyCode(this.s.charAt(this.charPos)));
    }

    const nowKey = document.getElementsByClassName('key_' + e.code);
    if (nowKey[0]) {
      nowKey[0].classList.remove("active");
    }
    if (e.code === "Enter" && nowKey.length >= 3) {
      nowKey[1].classList.remove("active");
      nowKey[2].classList.remove("active");
    }
  }

  /**
   * 入力をリセット
   */
  inputReset() {
    this.charPos = 0;
    const inputText = document.querySelectorAll("#inputKeywordDisplay span");
    inputText.forEach(span => span.setAttribute("class", "coordinate"));
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
  }

  /**
   * 全キーの強調表示をクリア
   */
  clearNextKey() {
    const allKey = document.querySelectorAll("#keyboard div");
    allKey.forEach(key => key.classList.remove("next"));
  }

  /**
   * かな文字に対応するキーコードを取得
   */
  getKeyCode(kana) {
    const key = this.codeList.find(d => this.isShift ? d.keyShift === kana : d.key === kana);
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

  decomposeHangul(text) {
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

// ==== 初期化 ====
window.onload = () => {
  const keyboard = new Keyboard("안녕하세요");
  keyboard.init();
};