import getRandomWords from './wordsApi.js';

const wordTxt = document.querySelector('.word');
const timeTxt = document.querySelector('.time b');
const correctWordCount = document.querySelector('.correctWords b');
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

let initGame = async () => {
    initTimer(31);

    const randomWords = await getRandomWords();

    if (!randomWords) {
        return randomWords;
    };

    let randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    let wordArr = randomWord.split('');

    for (let i = wordArr.length - 1; i > 0; i--) {
        let word = Math.floor(Math.random() * (i + 1));
        [wordArr[i], wordArr[word]] = [wordArr[word], wordArr[i]];
    };

    wordTxt.innerHTML = wordArr.join('');
    correctWord = randomWord.toLowerCase();
    inputField.value = '';
    inputField.setAttribute('maxlength', correctWord.length);
    console.log(randomWord);


}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) {
        return alert('Please enter a valid word!');
    }
    if (userWord !== correctWord) {
        return alert('Try again!')
    }
    if (userWord === correctWord) {
        count++;
        correctWordCount.innerText = count;
    }
    alert(`${correctWord} was the correct word!`);
    initGame();
}
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);