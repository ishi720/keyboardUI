'use strict';
var keyboardType = 'romaji';

// 入力用テキスト
var s = "aiueo";

var charPos = 0;
var isShift = false;
//キーリスト
var codeList = [
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

/**
 * ウィンドウの読み込み時に実行
 * 画面上に入力キーワードを表示し、次に入力するキーを強調表示する
 */
window.onload = function () {

  setInnerText('key');

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
    setInnerText('keyShift');
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
    setInnerText('key');
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
 * @param {string} v - 更新するテキスト ('keyShift', 'key')
 */
function setInnerText(v) {
  codeList.forEach(function(key) {
    if (v === "keyShift") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.keyShift;
    } else {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.key;
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
