const cardArray = [
    '🌹', '🌹',
    '🌵', '🌵',
    '🌳', '🌳',
    '🍄', '🍄',
    '🌻', '🌻',
    '🍂', '🍂',
    '🌴', '🌴',
    '🌾', '🌾'
];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');

function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
}

function createBoard() {
    grid.innerHTML = '';
    shuffleCards();
    cardArray.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        const front = document.createElement('div');
        front.classList.add('card-face', 'card-front');

        const back = document.createElement('div');
        back.classList.add('card-face', 'card-back');
        back.textContent = emoji;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    const id = this.getAttribute('data-id');
    if (cardsChosenId.includes(id) || cardsChosen.length >= 2) return;

    this.classList.add('flipped');
    cardsChosen.push(cardArray[id]);
    cardsChosenId.push(id);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 800);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[firstId].removeEventListener('click', flipCard);
        cards[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[firstId].classList.remove('flipped');
        cards[secondId].classList.remove('flipped');
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
        setTimeout(() => alert('🎉 Parabéns! Você encontrou todos os pares!'), 300);
    }
}

restartBtn.addEventListener('click', () => {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    createBoard();
});

createBoard();
