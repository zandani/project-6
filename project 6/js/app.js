const keyboardButton = document.querySelector('#qwerty');
const keys = keyboardButton.querySelectorAll('button');
const letters = document.getElementsByClassName('letter');
const phraseList = document.querySelector('#phrase ul');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const liveHearts = document.querySelectorAll('.tries img');
const phrases = [
  'eye of the beholder',
  'stay true to yourself',
  'time flies by',
  'one drop makes an ocean',
  'under the sea'
];
let missed = 0;

//Using event handler function for .btn__reset (startButton)
startButton.addEventListener('click', function () {
  overlay.style.display = 'none';
  //showing start button
  overlay.className = 'start';
  missed = 0;
  // showing letters that has been chosen
  for (let i = 0; i < letters.length; i++) {
    letters[i].classList.remove('show');
  }
  for (let i = 0; i < keys.length; i++) {
    keys[i].removeAttribute('class');
    keys[i].removeAttribute('disabled');
  }
  // showing how many heart lives there is
  for (let i = 0; i < liveHearts.length; i++) {
    liveHearts[i].src = '../images/liveHeart.png';
  }
});
// Give a random phrases each time
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  // showing letter of pharse and split is gaps between the words.
  return randomPhrase.toUpperCase().split('');
}

function addPhraseToDisplay(arr) {
  // do stuff any arr that is passed in, and add to `#phrase ul`
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') {
      // how show phrase with words and space between
      phraseList.innerHTML += `<li class="space">${arr[i]}</li>`;
    } else {
      phraseList.innerHTML += `<li class="letter">${arr[i]}</li>`;
    }
  }
}
// showing new phrases
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check letters
function checkLetter(button) {
  const buttonClicked = button.textContent.toUpperCase();
  // did not find a letter that matches the phrase
  let letterFound = null;
  for (let i = 0; i < letters.length; i += 1) {
    if (buttonClicked === letters[i].textContent) {
      letters[i].classList.add('show');
      letterFound = true;
    }
  } //showing the found letters
  return letterFound;
}
// using listening handler to hear for clicks on the keyboard
keyboardButton.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.className = 'chosen';
    e.target.disabled = true;
    const match = checkLetter(e.target);
    if (!match) {
      missed++;
      // showing loss hearts
      liveHearts[liveHearts.length - missed].src = '../images/lostHeart.png';
    }
    checkWin();
  }
});

//check win conditional statements
function checkWin() {
  const guesses = document.querySelectorAll('.show');
  if (letters.length === guesses.length) {
    overlay.classList.replace('start', 'win');
    title.textContent = 'You WON!';
    overlay.style.display = 'flex';
    startButton.textContent = 'Reset';
  } else if (missed >= 5) {
    overlay.classList.replace('start', 'lose');
    title.textContent = 'Sorry, you lost';
    overlay.style.display = 'flex';
    startButton.textContent = 'Reset';
  }
}
