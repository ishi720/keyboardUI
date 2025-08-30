'use strict';
var keyboardType = 'kana';

// 入力用テキスト
var s = "きょうは、りんごをたべる";

var charPos = 0;
var isShift = false;
//キーリスト
var codeList = [
  { code: "Digit1", kana: "ぬ", shift_kana: "ぬ"},
  { code: "Digit2", kana: "ふ", shift_kana: "ふ"},
  { code: "Digit3", kana: "あ", shift_kana: "ぁ"},
  { code: "Digit4", kana: "う", shift_kana: "ぅ"},
  { code: "Digit5", kana: "え", shift_kana: "ぇ"},
  { code: "Digit6", kana: "お", shift_kana: "ぉ"},
  { code: "Digit7", kana: "や", shift_kana: "ゃ"},
  { code: "Digit8", kana: "ゆ", shift_kana: "ゅ"},
  { code: "Digit9", kana: "よ", shift_kana: "ょ"},
  { code: "Digit0", kana: "わ", shift_kana: "を"},
  { code: "Minus", kana: "ほ", shift_kana: "ほ"},
  { code: "Equal", kana: "へ", shift_kana: "へ"},
  { code: "IntlYen", kana: "ー", shift_kana: "ー"},

  { code: "KeyQ", kana: "た", shift_kana: "た"},
  { code: "KeyW", kana: "て", shift_kana: "て"},
  { code: "KeyE", kana: "い", shift_kana: "ぃ"},
  { code: "KeyR", kana: "す", shift_kana: "す"},
  { code: "KeyT", kana: "か", shift_kana: "か"},
  { code: "KeyY", kana: "ん", shift_kana: "ん"},
  { code: "KeyU", kana: "な", shift_kana: "な"},
  { code: "KeyI", kana: "に", shift_kana: "に"},
  { code: "KeyO", kana: "ら", shift_kana: "ら"},
  { code: "KeyP", kana: "せ", shift_kana: "せ"},
  { code: "BracketLeft", kana: "゛", shift_kana: "゛"},
  { code: "BracketRight", kana: "゜", shift_kana: "「"},

  { code: "KeyA", kana: "ち", shift_kana: "ち"},
  { code: "KeyS", kana: "と", shift_kana: "と"},
  { code: "KeyD", kana: "し", shift_kana: "し"},
  { code: "KeyF", kana: "は", shift_kana: "は"},
  { code: "KeyG", kana: "き", shift_kana: "き"},
  { code: "KeyH", kana: "く", shift_kana: "く"},
  { code: "KeyJ", kana: "ま", shift_kana: "ま"},
  { code: "KeyK", kana: "の", shift_kana: "の"},
  { code: "KeyL", kana: "り", shift_kana: "り"},
  { code: "Semicolon", kana: "れ", shift_kana: "れ"},
  { code: "Quote", kana: "け", shift_kana: "け"},
  { code: "Backslash", kana: "む", shift_kana: "」"},

  { code: "KeyZ", kana: "つ", shift_kana: "っ"},
  { code: "KeyX", kana: "さ", shift_kana: "さ"},
  { code: "KeyC", kana: "そ", shift_kana: "そ"},
  { code: "KeyV", kana: "ひ", shift_kana: "ひ"},
  { code: "KeyB", kana: "こ", shift_kana: "こ"},
  { code: "KeyN", kana: "み", shift_kana: "み"},
  { code: "KeyM", kana: "も", shift_kana: "も"},
  { code: "Comma", kana: "ね", shift_kana: "、"},
  { code: "Period", kana: "る", shift_kana: "。"},
  { code: "Slash", kana: "め", shift_kana: "・"},
  { code: "IntlRo", kana: "ろ", shift_kana: "ろ"}
];

/**
 * ウィンドウの読み込み時に実行
 * 画面上に入力キーワードを表示し、次に入力するキーを強調表示する
 */
window.onload = function () {
  s = dakutenSeparation(s);
  //入力キーワードを画面上に表示
  var inputKeywordDisplay = document.getElementById("inputKeywordDisplay");
  for (var i = 0; i < s.length; i++) {
    var span = document.createElement("span");
    span.innerText = s.charAt(i);
    span.setAttribute("id", "char_" + i);
    span.setAttribute("class", "coordinate");
    inputKeywordDisplay.appendChild(span);
  }

  // 次に入力するキーを強調表示する
  var kana = s.charAt(charPos);
  coordinateNextKey(getKeyCode(kana));

  // イベント処理
  document.addEventListener('keydown', keydown_event);
  document.addEventListener('keyup', keyup_event);
}

/**
 * キーダウンイベントのハンドラ
 * @param {KeyboardEvent} e - キーボードイベント
 */
function keydown_event(e) {
  if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = true;

    setInnerText('shift_kana');
    coordinateNextKey(getKeyCode(s.charAt(charPos)));
  }

  //正しくキーを押されたときの処理
  var kana = s.charAt(charPos);
  if (kana !== "") {
    if ( getKeyCode(s.charAt(charPos)) === e.code ) {
      if ( charPos < s.length ) {
        var char = document.getElementById("char_" + charPos);
        char.classList.remove("coordinate");
        char.setAttribute("class", "done");
        charPos++;
        if (charPos != s.length) {
          kana = s.charAt(charPos);
          if (kana !== "") {
            var key = getKeyCode(kana);
            if (key === null) {
              coordinateNextKey('ShiftLeft');
            } else {
              coordinateNextKey(getKeyCode(kana));
            }
          }
        } else {
          inputReset();
        }
      } else {
        nextKeyClear();
      }
    }
  }

  var nowKey = document.getElementsByClassName('key_' + e.code);
  nowKey[0].classList.add("active");
  if(e.code === "Enter") {
    nowKey[1].classList.add("active");
    nowKey[2].classList.add("active");
  }
}

/**
 * キーアップイベントのハンドラ
 * @param {KeyboardEvent} e - キーボードイベント
 */
function keyup_event(e) {
  if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = false;
    setInnerText('kana');
    coordinateNextKey(getKeyCode(s.charAt(charPos)));
  }

  var nowKey = document.getElementsByClassName('key_' + e.code);
  nowKey[0].classList.remove("active");
  if(e.code == "Enter") {
    nowKey[1].classList.remove("active");
    nowKey[2].classList.remove("active");
  }
}

/**
 * 入力をリセット
 */
function inputReset() {
  charPos = 0;

  var inputText = document.querySelectorAll("#inputKeywordDisplay span");
  for (var i = 0; i < inputText.length; i++) {
    inputText[i].setAttribute("class", "coordinate");
  }

  var kana = s.charAt(charPos);
  coordinateNextKey(getKeyCode(kana));
}

/**
 * 次に入力するキーを強調表示する
 * @param {string} keyCode - 次に強調表示するキーのコード
 */
function coordinateNextKey(keyCode) {
  // 協調をリセットする
  nextKeyClear();

  // 次のキーを協調する
  var nextKey = document.getElementsByClassName('key_'+ keyCode);
  if (keyCode !== null) {
    nextKey[0].classList.add("next");
  }
}

/**
 * 全てのキーの強調表示をクリアする
 */
function nextKeyClear() {
  var allKey = document.querySelectorAll("#keyboard div");
  allKey.forEach(function(key) {
    key.classList.remove("next");
  });
}

/**
 * かな文字に対応するキーコードを取得する
 * @param {string} kana - かな文字
 * @returns {string|null} - 対応するキーコード、存在しない場合はnull
 */
function getKeyCode(kana) {
  var key;
  if (isShift) {
    key = codeList.find(function(d) {
      if (d.shift_kana === kana) {
        return d;
      }
    });
    if (typeof key === "undefined") {
      return null;
    } else {
      return key.code;
    }
  } else {
    key = codeList.find(function(d) {
      if (d.kana === kana) {
        return d;
      }
    });
    if (typeof key === "undefined") {
      return null;
    } else {
      return key.code;
    }
  }
}

/**
 * 指定された内容をキーリストに基づいて更新する
 * @param {string} v - 更新するテキスト ('shift_kana', 'kana')
 */
function setInnerText(v) {
  codeList.forEach(function(key) {
    if (v === "shift_kana") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_kana;
    } else {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.kana;
    }
  });
}

/**
 * 濁点を分離する関数
 * @param {string} s - 処理対象の文字列
 * @returns {string} - 濁点が分離された文字列
 */
function dakutenSeparation(s) {
  return s.normalize('NFD')
    .replace(/\u3099/g, '\u309b')
    .replace(/\u309a/g, '\u309c');
}
