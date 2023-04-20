import {
    words
} from './storeWords.js'

const wordTxt = document.querySelector('.word');
const hintTxt = document.querySelector('.hint span');
const timeTxt = document.querySelector('.time b');
const inputField = document.querySelector('input');
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');

let correctWord;
let timer;
let count = Number();

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeTxt.innerText = maxTime;
        }
        clearInterval(timer);
        alert('Time is off!' + ` ${correctWord} was the correct word!`);
        initGame();
    }, 1000);
}

let initGame = () => {
    initTimer(31);
    let randomObject = words[Math.floor(Math.random() * words.length)];
    let wordArr = randomObject.word.split('');
    for (let i = wordArr.length - 1; i > 0; i--) {
        let w = Math.floor(Math.random() * (i + 1));
        [wordArr[i], wordArr[w]] = [wordArr[w], wordArr[i]]
    }
    wordTxt.innerHTML = wordArr.join('');
    hintTxt.innerHTML = randomObject.hint;
    correctWord = randomObject.word.toLowerCase();
    inputField.value = '';
    inputField.setAttribute('maxlength', correctWord.length)
    console.log(randomObject);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert('Please enter a valid word!');
    if (userWord !== correctWord) return alert('Try again!')
    if (userWord === correctWord) {
        count++;
        console.log(count);
    }
    alert(`${correctWord} was the correct word!`);
    initGame();
}
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);