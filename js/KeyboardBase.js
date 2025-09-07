'use strict';

export default class KeyboardBase {
  constructor(targetText) {
    this.originalText = targetText;
    this.s = targetText;
    this.indexMap = this.createIndexMap(targetText, this.s);
    this.charPos = 0;
    this.isShift = false;
    this.codeList = []; // 継承先でセット
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
      span.innerText = this.originalText.charAt(i);
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
    for (const key of nowKey) {
        key.classList.add("active");
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
    for (const key of nowKey) {
        key.classList.remove("active");
    }
  }

  /**
   * マウスクリックでキーを押したときの処理
   */
  simulateKeyPress(code) {
    const kana = this.s.charAt(this.charPos);
    const keyObj = this.codeList.find(d => (this.isShift ? d.keyShift : d.key) === kana);
    if (keyObj && keyObj.code === code) {
      this.handleCorrectKey();
    }
    const nowKey = document.getElementsByClassName('key_' + code);
    for (const key of nowKey) {
        key.classList.add("active");
    }
    setTimeout(() => {
        for (const key of nowKey) {
            key.classList.remove("active");
        }
    }, 150);
  }

  /**
   * 正しくキーを押されたときの処理
   */
  handleCorrectKey() {
    // 分離済みインデックスからオリジナルインデックスを取得
    const originalIndex = this.indexMap.findIndex(arr => arr.includes(this.charPos));
    const char = document.getElementById("char_" + originalIndex);
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
}
