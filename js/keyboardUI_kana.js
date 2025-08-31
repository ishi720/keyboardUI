'use strict';
var keyboardType = 'kana';

// 入力用テキスト
var s = "きょうは、りんごをたべる";

var charPos = 0;
var isShift = false;
//キーリスト
var codeList = [
  { code: "Digit1", key: "ぬ", keyShift: "ぬ"},
  { code: "Digit2", key: "ふ", keyShift: "ふ"},
  { code: "Digit3", key: "あ", keyShift: "ぁ"},
  { code: "Digit4", key: "う", keyShift: "ぅ"},
  { code: "Digit5", key: "え", keyShift: "ぇ"},
  { code: "Digit6", key: "お", keyShift: "ぉ"},
  { code: "Digit7", key: "や", keyShift: "ゃ"},
  { code: "Digit8", key: "ゆ", keyShift: "ゅ"},
  { code: "Digit9", key: "よ", keyShift: "ょ"},
  { code: "Digit0", key: "わ", keyShift: "を"},
  { code: "Minus", key: "ほ", keyShift: "ほ"},
  { code: "Equal", key: "へ", keyShift: "へ"},
  { code: "IntlYen", key: "ー", keyShift: "ー"},

  { code: "KeyQ", key: "た", keyShift: "た"},
  { code: "KeyW", key: "て", keyShift: "て"},
  { code: "KeyE", key: "い", keyShift: "ぃ"},
  { code: "KeyR", key: "す", keyShift: "す"},
  { code: "KeyT", key: "か", keyShift: "か"},
  { code: "KeyY", key: "ん", keyShift: "ん"},
  { code: "KeyU", key: "な", keyShift: "な"},
  { code: "KeyI", key: "に", keyShift: "に"},
  { code: "KeyO", key: "ら", keyShift: "ら"},
  { code: "KeyP", key: "せ", keyShift: "せ"},
  { code: "BracketLeft", key: "゛", keyShift: "゛"},
  { code: "BracketRight", key: "゜", keyShift: "「"},

  { code: "KeyA", key: "ち", keyShift: "ち"},
  { code: "KeyS", key: "と", keyShift: "と"},
  { code: "KeyD", key: "し", keyShift: "し"},
  { code: "KeyF", key: "は", keyShift: "は"},
  { code: "KeyG", key: "き", keyShift: "き"},
  { code: "KeyH", key: "く", keyShift: "く"},
  { code: "KeyJ", key: "ま", keyShift: "ま"},
  { code: "KeyK", key: "の", keyShift: "の"},
  { code: "KeyL", key: "り", keyShift: "り"},
  { code: "Semicolon", key: "れ", keyShift: "れ"},
  { code: "Quote", key: "け", keyShift: "け"},
  { code: "Backslash", key: "む", keyShift: "」"},

  { code: "KeyZ", key: "つ", keyShift: "っ"},
  { code: "KeyX", key: "さ", keyShift: "さ"},
  { code: "KeyC", key: "そ", keyShift: "そ"},
  { code: "KeyV", key: "ひ", keyShift: "ひ"},
  { code: "KeyB", key: "こ", keyShift: "こ"},
  { code: "KeyN", key: "み", keyShift: "み"},
  { code: "KeyM", key: "も", keyShift: "も"},
  { code: "Comma", key: "ね", keyShift: "、"},
  { code: "Period", key: "る", keyShift: "。"},
  { code: "Slash", key: "め", keyShift: "・"},
  { code: "IntlRo", key: "ろ", keyShift: "ろ"}
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
      if (d.keyShift === kana) {
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
      if (d.key === kana) {
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
