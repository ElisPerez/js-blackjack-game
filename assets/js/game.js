/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const myModule = (() => {
  'use strict';
  let deck = [];
  const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'Q', 'K'];

  let playersPoints = [];

  // HTML References
  const btnNew = document.querySelector('#btnNew'),
    btnTake = document.querySelector('#btnTake'),
    btnStop = document.querySelector('#btnStop'),
    // Show cards
    divCardsPlayers = document.querySelectorAll('.divCards'),
    // Smalls Array
    pointsHTML = document.querySelectorAll('small');

  // This function initializes the game
  const initializeGame = (numPlayers = 2) => {
    deck = createDeck();

    playersPoints = [];

    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }

    pointsHTML.forEach(elementHTML => (elementHTML.innerText = 0));

    divCardsPlayers.forEach(elementHTML => (elementHTML.innerHTML = ''));

    btnTake.disabled = false;
    btnStop.disabled = false;
  };

  // New deck
  const createDeck = () => {
    // Restart deck
    deck = [];

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

    // Shuffle deck:
    return _.shuffle(deck);
  };

  // Take card function
  const takeCard = () => {
    if (deck.length === 0) {
      throw 'Deck empty';
    }

    // Remove last card from deck
    return deck.pop();
  };

  /** para sumar el valor de la carta. */
  const cardValue = card => {
    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;
    // "value * 1": Convert string to Number
  };

  // turn 0: Player 1, last turn: computer
  const accumulatePoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);

    pointsHTML[turn].innerText = playersPoints[turn];

    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    // <img class="card" src="assets/cards/2C.png" alt="card-2C">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('card-custom');
    imgCard.alt = `card-${card}`;

    divCardsPlayers[turn].append(imgCard);
  };

  const determineWinner = () => {
    const [minPoints, computerPoints] = playersPoints;

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
  // Computer turn
  const computerTurn = minPoints => {
    let computerPoints = 0;

    do {
      const card = takeCard();

      computerPoints = accumulatePoints(card, playersPoints.length - 1);

      createCard(card, playersPoints.length - 1);

      // if (minPoints > 21) {
      // break; // Se sale del ciclo do-while y continua al siguiente codigo de la función despues de este ciclo.
      // }
    } while (computerPoints < minPoints && minPoints <= 21);

    determineWinner();
  };

  // Events
  btnTake.addEventListener('click', () => {
    const card = takeCard();

    const playerPoints = accumulatePoints(card, 0);

    createCard(card, 0);

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

    computerTurn(playersPoints[0]);
  });

  // btnNew.addEventListener('click', () => {
  //   initializeGame();
  // });

  return {
    newGame: initializeGame,
  };
})();
