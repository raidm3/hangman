console.log('Welcome to Hangman!');

let lives = 10;
let guess = [];
let solution = [];

const cities = [
  'tokyo',
  'jakarta',
  'delhi',
  'shanghai',
  'sao paulo',
  'mexico city',
  'kairo',
  'mumbai',
  'beijing',
  'dhaka',
  'osaka',
  'new york',
  'karachi',
  'buenos aires',
  'chongqing',
  'istanbul',
  'kolkata',
  'manila',
  'lagos',
  'rio de janeiro',
  'tianjin',
  'kinshasa',
  'guangzhou',
  'los angeles',
  'moscow',
  'shenzhen',
];

function getRandomCity() {
  return cities[Math.floor(Math.random() * cities.length)];
}

function initGuess(word) {
  for (let i = 0; i < word.length; i++) {
    guess[i] = word[i] === ' ' ?  ' ' : '_';
  }
}

function initWordHolder(guess) {
  let holder = document.getElementById('guessHolder');
  holder.innerHTML = '';

  for (let i = 0; i < guess.length; i++) {
    const div = document.createElement('div');
    const content = document.createTextNode(guess[i]);
    div.appendChild(content);
    holder.appendChild(div);
  }
}

function removeLive() {
  lives -= 1;

  document.getElementById('numberOfLives').innerHTML = lives;

  if (lives === 0) {
    endGame(false);
    return;
  }
} 

function guessChar(el, char) {
  // check solution and add to guess if match(es)
  let occurrences = getAllIndexes(solution, char);

  if (occurrences.length > 0) {
    for(let i = 0; i < occurrences.length; i++) {
      guess[occurrences[i]] = char;
    }

    // update DOM
    initWordHolder(guess);

    // solution has been found
    if (guess.join('') === solution.join('')) {
      endGame(true);
    }
  } else {
    // if wrong substract one life
    removeLive();
  }

  // disable button
  el.setAttribute('disabled', '');
}

function getAllIndexes(arr, val) {
  let indexes = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
}

function endGame(win) {
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  
  if (win) {
    overlay.innerHTML = '<p>You Won!</p>';
  } else {
    overlay.innerHTML = '<p>Game Over!<br><i>' + solution.join('') + '</i></p>';
  }
}


function main() {
  const city = getRandomCity();

  initGuess(city);
  initWordHolder(guess);

  solution = city.split('');
};

this.main();