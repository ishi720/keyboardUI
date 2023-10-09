var keyboardType = 'kana';

// 入力用テキスト
var s = "きょうは、りんごをたべる";

var charPos = 0;
var isShift = false;
//キーリスト
var codeList = [
  { code : "Digit1", romaji : "1", shift_romaji : "!" , kana : "ぬ", shift_kana: "ぬ" },
  { code : "Digit2", romaji : "2", shift_romaji : "\"" , kana : "ふ", shift_kana: "ふ" },
  { code : "Digit3", romaji : "3", shift_romaji : "#" , kana : "あ", shift_kana: "ぁ" },
  { code : "Digit4", romaji : "4", shift_romaji : "$" , kana : "う", shift_kana: "ぅ" },
  { code : "Digit5", romaji : "5", shift_romaji : "%" , kana : "え", shift_kana: "ぇ" },
  { code : "Digit6", romaji : "6", shift_romaji : "&" , kana : "お", shift_kana: "ぉ" },
  { code : "Digit7", romaji : "7", shift_romaji : "'" , kana : "や", shift_kana: "ゃ" },
  { code : "Digit8", romaji : "8", shift_romaji : "(" , kana : "ゆ", shift_kana: "ゅ" },
  { code : "Digit9", romaji : "9", shift_romaji : ")" , kana : "よ", shift_kana: "ょ" },
  { code : "Digit0", romaji : "0", shift_romaji : "" , kana : "わ", shift_kana: "を" },
  { code : "Minus", romaji : "-", shift_romaji : "=" , kana : "ほ", shift_kana: "ほ" },
  { code : "Equal", romaji : "~", shift_romaji : "~" , kana : "へ", shift_kana: "へ" },
  { code : "IntlYen", romaji : "\\", shift_romaji : "|" , kana : "ー", shift_kana: "ー" },

  { code : "KeyQ", romaji : "q", shift_romaji : "Q" , kana : "た", shift_kana: "た" },
  { code : "KeyW", romaji : "w", shift_romaji : "W" , kana : "て", shift_kana: "て" },
  { code : "KeyE", romaji : "e", shift_romaji : "E" , kana : "い", shift_kana: "ぃ" },
  { code : "KeyR", romaji : "r", shift_romaji : "R" , kana : "す", shift_kana: "す" },
  { code : "KeyT", romaji : "t", shift_romaji : "T" , kana : "か", shift_kana: "か" },
  { code : "KeyY", romaji : "y", shift_romaji : "Y" , kana : "ん", shift_kana: "ん" },
  { code : "KeyU", romaji : "u", shift_romaji : "U" , kana : "な", shift_kana: "な" },
  { code : "KeyI", romaji : "i", shift_romaji : "I" , kana : "に", shift_kana: "に" },
  { code : "KeyO", romaji : "o", shift_romaji : "O" , kana : "ら", shift_kana: "ら" },
  { code : "KeyP", romaji : "p", shift_romaji : "P" , kana : "せ", shift_kana: "せ" },
  { code : "BracketLeft", romaji : "@", shift_romaji : "`" , kana : "゛", shift_kana: "゛" },
  { code : "BracketRight", romaji : "[", shift_romaji : "{" , kana : "゜", shift_kana: "「" },

  { code : "KeyA", romaji : "a", shift_romaji : "A" , kana : "ち", shift_kana: "ち" },
  { code : "KeyS", romaji : "s", shift_romaji : "S" , kana : "と", shift_kana: "と" },
  { code : "KeyD", romaji : "d", shift_romaji : "D" , kana : "し", shift_kana: "し" },
  { code : "KeyF", romaji : "f", shift_romaji : "F" , kana : "は", shift_kana: "は" },
  { code : "KeyG", romaji : "g", shift_romaji : "G" , kana : "き", shift_kana: "き" },
  { code : "KeyH", romaji : "h", shift_romaji : "H" , kana : "く", shift_kana: "く" },
  { code : "KeyJ", romaji : "j", shift_romaji : "J" , kana : "ま", shift_kana: "ま" },
  { code : "KeyK", romaji : "k", shift_romaji : "K" , kana : "の", shift_kana: "の" },
  { code : "KeyL", romaji : "l", shift_romaji : "L" , kana : "り", shift_kana: "り" },
  { code : "Semicolon", romaji : ";", shift_romaji : "+" , kana : "れ", shift_kana: "れ" },
  { code : "Quote", romaji : ":", shift_romaji : "*" , kana : "け", shift_kana: "け" },
  { code : "Backslash", romaji : "]", shift_romaji : "}" , kana : "む", shift_kana: "」" },

  { code : "KeyZ", romaji : "z", shift_romaji : "Z" , kana : "つ", shift_kana: "っ" },
  { code : "KeyX", romaji : "x", shift_romaji : "X" , kana : "さ", shift_kana: "さ" },
  { code : "KeyC", romaji : "c", shift_romaji : "C" , kana : "そ", shift_kana: "そ" },
  { code : "KeyV", romaji : "v", shift_romaji : "V" , kana : "ひ", shift_kana: "ひ" },
  { code : "KeyB", romaji : "b", shift_romaji : "B" , kana : "こ", shift_kana: "こ" },
  { code : "KeyN", romaji : "n", shift_romaji : "N" , kana : "み", shift_kana: "み" },
  { code : "KeyM", romaji : "m", shift_romaji : "M" , kana : "も", shift_kana: "も" },
  { code : "Comma", romaji : ",", shift_romaji : "<" , kana : "ね", shift_kana: "、" },
  { code : "Period", romaji : ".", shift_romaji : ">" , kana : "る", shift_kana: "。" },
  { code : "Slash", romaji : "/", shift_romaji : "?" , kana : "め", shift_kana: "・" },
  { code : "IntlRo", romaji : "\\", shift_romaji : "_" , kana : "ろ", shift_kana: "ろ" }
];


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

function keydown_ivent(e) {
  if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = true;
  	if ( keyboardType === 'kana') {
  		setInnerText('shift_kana');
      coordinateNextKey(getKeyCode(s.charAt(charPos)));

  	} else {
  		setInnerText('shift_romaji');
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
          var kana = s.charAt(charPos);
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

function keyup_ivent(e) {
　if (e.code === "ShiftRight" || e.code === "ShiftLeft") {
    isShift = false;
	  if ( keyboardType === 'kana') {
  		setInnerText('kana');
        coordinateNextKey(getKeyCode(s.charAt(charPos)));
  	} else {
  		setInnerText('romaji');
  	}
  }

  var nowKey = document.getElementsByClassName('key_' + e.code);
  nowKey[0].classList.remove("active");
  if(e.code == "Enter") {
    nowKey[1].classList.remove("active");
    nowKey[2].classList.remove("active");
  }
}


function inputRest() {
  charPos = 0;

  var inputText = document.querySelectorAll("#inputKeywordDisplay span");
  for (var i = 0; i < inputText.length; i++) {
    inputText[i].setAttribute("class", "coordinate");
  }

  var kana = s.charAt(charPos);
  coordinateNextKey(getKeyCode(kana));

}

function coordinateNextKey(keyCode) {
	// 協調をリセットする
	nextKeyClear();

	// 次のキーを協調する
  nextKey = document.getElementsByClassName('key_'+ keyCode);
  if (keyCode !== null) {
   nextKey[0].classList.add("next");
  }
}

function nextKeyClear() {
	var allKey = document.querySelectorAll("#keyboard div");
	allKey.forEach(function(key) {
  		key.classList.remove("next");
	});
}

function getKeyCode(kana) {
  if (isShift) {
    var key = codeList.find(function(d) {
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
    var key = codeList.find(function(d) {
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

function setInnerText(v) {
  codeList.forEach(function(key) {
  	if (v === "romaji") {
  		document.getElementsByClassName("key_"+ key.code)[0].innerText = key.romaji;
  	} else if (v === "shift_romaji") {
  		document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_romaji;
  	} else if (v === "shift_kana") {
  		document.getElementsByClassName("key_"+ key.code)[0].innerText = key.shift_kana;
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
	} else {
		keyboardType = 'kana';
		e.setAttribute("class", 'kana');
		e.innerText = "かな";
		setInnerText('kana');
	}
}


function dakutenSeparation(s) {
  return s.normalize('NFD')
    .replace(/\u3099/g, '\u309b')
    .replace(/\u309a/g, '\u309c');
}
