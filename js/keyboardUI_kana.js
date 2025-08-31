'use strict';

class Keyboard {
  constructor(targetText, keyboardType = 'kana') {
    this.keyboardType = keyboardType;
    this.s = this.dakutenSeparation(targetText);
    this.charPos = 0;
    this.isShift = false;

    // キーリスト
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
      { code: "IntlRo", key: "ろ", keyShift: "ろ" }
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

  /**
   * 濁点を分離
   */
  dakutenSeparation(s) {
    return s.normalize('NFD')
      .replace(/\u3099/g, '\u309b')
      .replace(/\u309a/g, '\u309c');
  }
}

// ==== 初期化 ====
window.onload = () => {
  const keyboard = new Keyboard("きょうは、りんごをたべる");
  keyboard.init();
};