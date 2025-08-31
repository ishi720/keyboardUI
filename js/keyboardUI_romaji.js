'use strict';

class Keyboard {
  constructor(targetText, keyboardType = 'romaji') {
    this.keyboardType = keyboardType;
    this.s = targetText;
    this.charPos = 0;
    this.isShift = false;

    // キーリスト
    this.codeList = [
      { code: "Digit1", key: "1", keyShift: "!"},
      { code: "Digit2", key: "2", keyShift: "\""},
      { code: "Digit3", key: "3", keyShift: "#"},
      { code: "Digit4", key: "4", keyShift: "$"},
      { code: "Digit5", key: "5", keyShift: "%"},
      { code: "Digit6", key: "6", keyShift: "&"},
      { code: "Digit7", key: "7", keyShift: "'"},
      { code: "Digit8", key: "8", keyShift: "("},
      { code: "Digit9", key: "9", keyShift: ")"},
      { code: "Digit0", key: "0", keyShift: ""},
      { code: "Minus", key: "-", keyShift: "="},
      { code: "Equal", key: "~", keyShift: "~"},
      { code: "IntlYen", key: "\\", keyShift: "|"},

      { code: "KeyQ", key: "q", keyShift: "Q"},
      { code: "KeyW", key: "w", keyShift: "W"},
      { code: "KeyE", key: "e", keyShift: "E"},
      { code: "KeyR", key: "r", keyShift: "R"},
      { code: "KeyT", key: "t", keyShift: "T"},
      { code: "KeyY", key: "y", keyShift: "Y"},
      { code: "KeyU", key: "u", keyShift: "U"},
      { code: "KeyI", key: "i", keyShift: "I"},
      { code: "KeyO", key: "o", keyShift: "O"},
      { code: "KeyP", key: "p", keyShift: "P"},
      { code: "BracketLeft", key: "@", keyShift: "`"},
      { code: "BracketRight", key: "[", keyShift: "{"},

      { code: "KeyA", key: "a", keyShift: "A"},
      { code: "KeyS", key: "s", keyShift: "S"},
      { code: "KeyD", key: "d", keyShift: "D"},
      { code: "KeyF", key: "f", keyShift: "F"},
      { code: "KeyG", key: "g", keyShift: "G"},
      { code: "KeyH", key: "h", keyShift: "H"},
      { code: "KeyJ", key: "j", keyShift: "J"},
      { code: "KeyK", key: "k", keyShift: "K"},
      { code: "KeyL", key: "l", keyShift: "L"},
      { code: "Semicolon", key: ";", keyShift: "+"},
      { code: "Quote", key: ":", keyShift: "*"},
      { code: "Backslash", key: "]", keyShift: "}"},

      { code: "KeyZ", key: "z", keyShift: "Z"},
      { code: "KeyX", key: "x", keyShift: "X"},
      { code: "KeyC", key: "c", keyShift: "C"},
      { code: "KeyV", key: "v", keyShift: "V"},
      { code: "KeyB", key: "b", keyShift: "B"},
      { code: "KeyN", key: "n", keyShift: "N"},
      { code: "KeyM", key: "m", keyShift: "M"},
      { code: "Comma", key: ",", keyShift: "<"},
      { code: "Period", key: ".", keyShift: ">"},
      { code: "Slash", key: "/", keyShift: "?"},
      { code: "IntlRo", key: "\\", keyShift: "_"}
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
}

// ==== 初期化 ====
window.onload = () => {
  const keyboard = new Keyboard("Hello,world!");
  keyboard.init();
};