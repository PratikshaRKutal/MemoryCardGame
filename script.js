const gameBoard = document.querySelector('.board');
const cards = ['🍕', '🚀', '🧠', '🎯', '🎵', '🌟', '🔥', '💎'];
const deck = [...cards, ...cards];

deck.sort(() => Math.random() - 0.5);

deck.forEach(symbol => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.dataset.symbol = symbol;

    cardEl.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${symbol}</div>
        </div>
    `;

    cardEl.addEventListener('click', handleCardClick);

    gameBoard.appendChild(cardEl);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let currentPlayer = 1;
let player1score = 0;
let player2score = 0;

function handleCardClick(event){
    const clickedCard = event.currentTarget;

    if(lockBoard || clickedCard === firstCard || clickedCard.classList.contains("matched")) return;

    clickedCard.classList.add("flipped");

    if(!firstCard){
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    if(firstCard.dataset.symbol === secondCard.dataset.symbol){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        if(currentPlayer === 1){
            player1score++;
            document.getElementById("p1-score").textContent = player1score;
        } else {
            player2score++;
            document.getElementById("p2-score").textContent = player2score;
        }

        resetBoard();
        checkWinner();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            switchPlayer();
            resetBoard();
        }, 1000);
    }
}

function resetBoard(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function switchPlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    document.getElementById("p1-score").classList.toggle("active-player", currentPlayer === 1);
    document.getElementById("p2-score").classList.toggle("active-player", currentPlayer === 2);

    const overlay = document.getElementById("turn-overlay");
    overlay.textContent = "Player " + currentPlayer + "'s turn";
    overlay.style.opacity = 1;

    setTimeout(() => {
        overlay.style.opacity = 0;
    }, 1000);
}

window.onload = () => {
    const overlay = document.getElementById("turn-overlay");
    overlay.textContent = "Player " + currentPlayer + "'s turn";
    overlay.style.opacity = 1;
    setTimeout(() => {
        overlay.style.opacity = 0;
    }, 1000);
};

function fireConfetti(){
    var duration = 1000;
    var end = Date.now() + duration;
    (function frame() {
        confetti({
            particleCount: 7,
            spread: 50,
            origin: { y: 0.6 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function checkWinner(){
    const totalPairs = cards.length;

    if(player1score + player2score === totalPairs){
        let winnerText = "";
        if(player1score > player2score){
            winnerText = "🏆 Player 1 wins!";
        } else if(player2score > player1score){
            winnerText = "🏆 Player 2 wins!";
        } else {
            winnerText = "It's a tie!";
        }

        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.textContent = winnerText;
        winnerDisplay.style.opacity = 1;

        fireConfetti();
    }
}

document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
});
