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
    // console.log(char)
}

var h1 = document.querySelector('h1');
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

function next() {
    var c = queue[0];
    queue = queue.slice(1);
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) {
        setTimeout(next, Math.random() * 200 + 50);
    }
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed', 'on');
    checkInCorrect()
});
function checkInCorrect() {
    setTimeout(function () {
        const enteredValue = document.getElementById("user-input").value
        const allLetters = document.querySelectorAll('h2 span')
        const lastLetter = allLetters[enteredValue.length - 1]
        if (lastLetter.innerHTML == enteredValue[enteredValue.length - 1]) {
            lastLetter.classList.add('correct')
            lastLetter.classList.remove('incorrect')
        }
        else {
            lastLetter.classList.add('incorrect')
        }
    }, 0)
}
document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    key && key.removeAttribute('data-pressed');
});

function size() {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
    // console.log(size);
}

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