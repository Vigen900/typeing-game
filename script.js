class Timer {
    constructor() {
       this.timer = []
       this.timePassed = 0
    }
    startTimer() {
       this.timer = setInterval(()=> {
          this.timePassed += 1
          timerDiv.innerHTML = this.timePassed
       }, 1000)
    }
}

function getKey(e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        selector = [
            '[data-key="' + code + '"]',
            '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    return document.querySelector(selector);
}

function pressKey(char) {
    var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed', 'on');
    setTimeout(function () {
        key.removeAttribute('data-pressed');
    }, 200);
}

function checkIsCorrect() {
    const allLetters = document.querySelectorAll('h2 span')
    const enteredValue = document.getElementById("user-input").value
    const lastLetter = allLetters[enteredValue.length - 1]

    progress.innerHTML = enteredValue.length;

    if (!lastLetter) {
        return;
    }
    if (lastLetter.innerHTML == enteredValue[enteredValue.length - 1]) {
        lastLetter.classList.add('correct')
        lastLetter.classList.remove('incorrect')
    } else {
        lastLetter.classList.add('incorrect')
    }
}

function next() {
    var c = queue[0];
    queue = queue.slice(1);
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) {
        setTimeout(next, Math.random() * 200 + 50);
    }
}

function size() {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
}

function showAlert() {
    alert('Please use your physical keyboard to learn how to type fast');
}

var h1 = document.querySelector('h1');
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
    size();
});
size();

const h2 = document.querySelector('h2')
const h2content = h2.innerHTML
let h2newContent = ''

for (let i = 0; i < h2content.length; i++) {
    h2newContent += `<span>${h2content[i]}</span>`
}
h2.innerHTML = h2newContent

const mtTimer = new Timer();
mtTimer.startTimer();

document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    key && key.removeAttribute('data-pressed');
    checkIsCorrect()
});
