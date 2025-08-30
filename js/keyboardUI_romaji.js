'use strict';
var keyboardType = 'romaji';  // 'kana', 'romaji', 'hangul'

// 入力用テキスト
var s = "aiueo";

var charPos = 0;
var isShift = false;
//キーリスト
var codeList = [
  { code: "Digit1", romaji: "1", shift_romaji: "!", kana: "ぬ", shift_kana: "ぬ", hangul: "1", shift_hangul: "!" },
  { code: "Digit2", romaji: "2", shift_romaji: "\"", kana: "ふ", shift_kana: "ふ", hangul: "2", shift_hangul: "@" },
  { code: "Digit3", romaji: "3", shift_romaji: "#", kana: "あ", shift_kana: "ぁ", hangul: "3", shift_hangul: "#" },
  { code: "Digit4", romaji: "4", shift_romaji: "$", kana: "う", shift_kana: "ぅ", hangul: "4", shift_hangul: "$" },
  { code: "Digit5", romaji: "5", shift_romaji: "%", kana: "え", shift_kana: "ぇ", hangul: "5", shift_hangul: "%" },
  { code: "Digit6", romaji: "6", shift_romaji: "&", kana: "お", shift_kana: "ぉ", hangul: "6", shift_hangul: "^" },
  { code: "Digit7", romaji: "7", shift_romaji: "'", kana: "や", shift_kana: "ゃ", hangul: "7", shift_hangul: "&" },
  { code: "Digit8", romaji: "8", shift_romaji: "(", kana: "ゆ", shift_kana: "ゅ", hangul: "8", shift_hangul: "*" },
  { code: "Digit9", romaji: "9", shift_romaji: ")", kana: "よ", shift_kana: "ょ", hangul: "9", shift_hangul: "(" },
  { code: "Digit0", romaji: "0", shift_romaji: "", kana: "わ", shift_kana: "を", hangul: "0", shift_hangul: ")" },
  { code: "Minus", romaji: "-", shift_romaji: "=", kana: "ほ", shift_kana: "ほ", hangul: "-", shift_hangul: "_" },
  { code: "Equal", romaji: "~", shift_romaji: "~", kana: "へ", shift_kana: "へ", hangul: "=", shift_hangul: "+" },
  { code: "IntlYen", romaji: "\\", shift_romaji: "|", kana: "ー", shift_kana: "ー", hangul: "", shift_hangul: "" },

  { code: "KeyQ", romaji: "q", shift_romaji: "Q", kana: "た", shift_kana: "た", hangul: "ㅂ", shift_hangul: "ㅃ" },
  { code: "KeyW", romaji: "w", shift_romaji: "W", kana: "て", shift_kana: "て", hangul: "ㅈ", shift_hangul: "ㅉ" },
  { code: "KeyE", romaji: "e", shift_romaji: "E", kana: "い", shift_kana: "ぃ", hangul: "ㄷ", shift_hangul: "ㄸ" },
  { code: "KeyR", romaji: "r", shift_romaji: "R", kana: "す", shift_kana: "す", hangul: "ㄱ", shift_hangul: "ㄲ" },
  { code: "KeyT", romaji: "t", shift_romaji: "T", kana: "か", shift_kana: "か", hangul: "ㅅ", shift_hangul: "ㅆ" },
  { code: "KeyY", romaji: "y", shift_romaji: "Y", kana: "ん", shift_kana: "ん", hangul: "ㅛ", shift_hangul: "ㅛ" },
  { code: "KeyU", romaji: "u", shift_romaji: "U", kana: "な", shift_kana: "な", hangul: "ㅕ", shift_hangul: "ㅕ" },
  { code: "KeyI", romaji: "i", shift_romaji: "I", kana: "に", shift_kana: "に", hangul: "ㅑ", shift_hangul: "ㅑ" },
  { code: "KeyO", romaji: "o", shift_romaji: "O", kana: "ら", shift_kana: "ら", hangul: "ㅐ", shift_hangul: "ㅒ" },
  { code: "KeyP", romaji: "p", shift_romaji: "P", kana: "せ", shift_kana: "せ", hangul: "ㅔ", shift_hangul: "ㅖ" },
  { code: "BracketLeft", romaji: "@", shift_romaji: "`", kana: "゛", shift_kana: "゛", hangul: "[", shift_hangul: "{" },
  { code: "BracketRight", romaji: "[", shift_romaji: "{", kana: "゜", shift_kana: "「", hangul: "]", shift_hangul: "}" },

  { code: "KeyA", romaji: "a", shift_romaji: "A", kana: "ち", shift_kana: "ち", hangul: "ㅁ", shift_hangul: "ㅁ" },
  { code: "KeyS", romaji: "s", shift_romaji: "S", kana: "と", shift_kana: "と", hangul: "ㄴ", shift_hangul: "ㄴ" },
  { code: "KeyD", romaji: "d", shift_romaji: "D", kana: "し", shift_kana: "し", hangul: "ㅇ", shift_hangul: "ㅇ" },
  { code: "KeyF", romaji: "f", shift_romaji: "F", kana: "は", shift_kana: "は", hangul: "ㄹ", shift_hangul: "ㄹ" },
  { code: "KeyG", romaji: "g", shift_romaji: "G", kana: "き", shift_kana: "き", hangul: "ㅎ", shift_hangul: "ㅎ" },
  { code: "KeyH", romaji: "h", shift_romaji: "H", kana: "く", shift_kana: "く", hangul: "ㅗ", shift_hangul: "ㅗ" },
  { code: "KeyJ", romaji: "j", shift_romaji: "J", kana: "ま", shift_kana: "ま", hangul: "ㅓ", shift_hangul: "ㅓ" },
  { code: "KeyK", romaji: "k", shift_romaji: "K", kana: "の", shift_kana: "の", hangul: "ㅏ", shift_hangul: "ㅏ" },
  { code: "KeyL", romaji: "l", shift_romaji: "L", kana: "り", shift_kana: "り", hangul: "ㅣ", shift_hangul: "ㅣ" },
  { code: "Semicolon", romaji: ";", shift_romaji: "+", kana: "れ", shift_kana: "れ", hangul: ";", shift_hangul: ":" },
  { code: "Quote", romaji: ":", shift_romaji: "*", kana: "け", shift_kana: "け", hangul: "'", shift_hangul: "\"" },
  { code: "Backslash", romaji: "]", shift_romaji: "}", kana: "む", shift_kana: "」", hangul: "\\", shift_hangul: "|" },

  { code: "KeyZ", romaji: "z", shift_romaji: "Z", kana: "つ", shift_kana: "っ", hangul: "ㅋ", shift_hangul: "ㅋ" },
  { code: "KeyX", romaji: "x", shift_romaji: "X", kana: "さ", shift_kana: "さ", hangul: "ㅌ", shift_hangul: "ㅌ" },
  { code: "KeyC", romaji: "c", shift_romaji: "C", kana: "そ", shift_kana: "そ", hangul: "ㅊ", shift_hangul: "ㅊ" },
  { code: "KeyV", romaji: "v", shift_romaji: "V", kana: "ひ", shift_kana: "ひ", hangul: "ㅍ", shift_hangul: "ㅍ" },
  { code: "KeyB", romaji: "b", shift_romaji: "B", kana: "こ", shift_kana: "こ", hangul: "ㅠ", shift_hangul: "ㅠ" },
  { code: "KeyN", romaji: "n", shift_romaji: "N", kana: "み", shift_kana: "み", hangul: "ㅜ", shift_hangul: "ㅜ" },
  { code: "KeyM", romaji: "m", shift_romaji: "M", kana: "も", shift_kana: "も", hangul: "ㅡ", shift_hangul: "ㅡ" },
  { code: "Comma", romaji: ",", shift_romaji: "<", kana: "ね", shift_kana: "、", hangul: ",", shift_hangul: "<" },
  { code: "Period", romaji: ".", shift_romaji: ">", kana: "る", shift_kana: "。", hangul: ".", shift_hangul: ">" },
  { code: "Slash", romaji: "/", shift_romaji: "?", kana: "め", shift_kana: "・", hangul: "/", shift_hangul: "?" },
  { code: "IntlRo", romaji: "\\", shift_romaji: "_", kana: "ろ", shift_kana: "ろ", hangul: "", shift_hangul: "" }
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
  document.addEventListener('keydown', keydown_ivent);
  document.addEventListener('keyup', keyup_ivent);
}

/**
 * キーダウンイベントのハンドラ
 * @param {KeyboardEvent} e - キーボードイベント
 */
function keydown_ivent(e) {
  if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = true;
    if ( keyboardType === 'kana') {
      setInnerText('shift_kana');
      coordinateNextKey(getKeyCode(s.charAt(charPos)));
    } else if( keyboardType === 'romaji') {
      setInnerText('shift_romaji');
    } else {
      setInnerText('shift_hangul');
    }
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
          inputRest();
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
function keyup_ivent(e) {
  if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = false;
    if ( keyboardType === 'kana') {
      setInnerText('kana');
      coordinateNextKey(getKeyCode(s.charAt(charPos)));
    } else if( keyboardType === 'romaji') {
      setInnerText('romaji');
    } else {
      setInnerText('hangul');
    }
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
function inputRest() {
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
 * @param {string} v - 更新するテキスト ('romaji', 'shift_romaji', 'shift_kana', 'kana')
 */
function setInnerText(v) {
  codeList.forEach(function(key) {
    if (v === "romaji") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.romaji;
    } else if (v === "shift_romaji") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_romaji;
    } else if (v === "shift_kana") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_kana;
    } else if (v === "hangul") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.hangul;
    } else if (v === "shift_hangul") {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_hangul;
    } else {
      document.getElementsByClassName("key_"+ key.code)[0].innerText = key.kana;
    }
  });
}

function changeKeyboardType() {
  var e = document.getElementById("keyboardType");
  if (keyboardType === 'kana') {
    keyboardType = 'romaji';
    e.setAttribute("class", 'romaji');
    e.innerText = "ローマ字";
    setInnerText('romaji');
  } else if (keyboardType === 'romaji') {
    keyboardType = 'romaji';
    e.setAttribute("class", 'romaji');
    e.innerText = "ローマ字";
    setInnerText('romaji');
  } else if (keyboardType === 'hangul') {
    keyboardType = 'hangul';
    e.setAttribute("class", 'hangul');
    e.innerText = "ハングル";
    setInnerText('hangul');
  }
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
