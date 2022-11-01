/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
  computerPoints = 0;

// HTML References
const btnNew = document.querySelector('#btnNew');
const btnTake = document.querySelector('#btnTake');
const btnStop = document.querySelector('#btnStop');

const divPlayerCards = document.querySelector('#playerCards');
const divComputerCards = document.querySelector('#computerCards');

// Smalls Array
const pointsHTML = document.querySelectorAll('small');

// New deck
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const type of types) {
      deck.push(i + type);
    }
  }

  for (const type of types) {
    for (const spe of specials) {
      deck.push(spe + type);
    }
  }

  // Normal deck:
  // console.log(deck);

  // Shuffle deck:
  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
};

createDeck();

// Take card function
const takeCard = () => {
  if (deck.length === 0) {
    throw 'Deck empty';
  }

  // Remove last card from deck
  const card = deck.pop();

  return card;
};

/** para sumar el valor de la carta. */
const cardValue = card => {
  const value = card.substring(0, card.length - 1);

  return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
  // "value * 1": Convert string to Number
};

// Computer turn
const computerTurn = minPoints => {
  do {
    const card = takeCard();

    computerPoints = computerPoints + cardValue(card);

    pointsHTML[1].innerText = computerPoints;

    // <img class="card" src="assets/cards/2C.png" alt="card-2C">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('card-custom');
    imgCard.alt = `card-${card}`;

    divComputerCards.append(imgCard);

    if (minPoints > 21) {
      break; // Se sale del ciclo do-while y continua al siguiente codigo de la función despues de este ciclo.
    }
  } while (computerPoints < minPoints && minPoints <= 21);

  setTimeout(() => {
    if (computerPoints === minPoints) {
      alert('Nobody wins 🤷🏻');
    } else if (minPoints > 21) {
      alert('Computer Wins 😛');
    } else if (computerPoints > 21) {
      alert('Player Wins 😎');
    } else {
      alert('Computer Wins 😛');
    }
  }, 100);
};

// Events
btnTake.addEventListener('click', () => {
  const card = takeCard();

  playerPoints = playerPoints + cardValue(card);
  pointsHTML[0].innerText = playerPoints;

  // <img class="card" src="assets/cards/2C.png" alt="card2C" />
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cards/${card}.png`;
  imgCard.classList.add('card-custom');
  imgCard.alt = `card-${card}`;

  divPlayerCards.append(imgCard);

  if (playerPoints > 21) {
    console.warn('Sorry, You Lost');
    btnTake.disabled = true;
    btnStop.disabled = true;

    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn('21, Great');
    btnTake.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  }
});

btnStop.addEventListener('click', () => {
  btnTake.disabled = true;
  btnStop.disabled = true;

  computerTurn(playerPoints);
});

btnNew.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = createDeck();

    playerPoints = 0;
    computerPoints = 0;

    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnTake.disabled = false;
    btnStop.disabled = false;
});



