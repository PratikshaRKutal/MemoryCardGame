const gameBoard = document.querySelector('.board');
const cards=['🍕', '🚀', '🧠', '🎯', '🎵', '🌟'];
const deck = [...cards, ...cards];

deck.sort(() => Math.random() - 0.5);

deck.forEach((symbol)=>{
    const cardEl=document.createElement('div')
    cardEl.classList.add('card');
    cardEl.dataset.symbol=symbol;

    cardEl.textContent='';

    cardEl.addEventListener('click', handleCardClick);

    gameBoard.appendChild(cardEl);
});

let firstCard=null;
let secondCard=null;
let lockBoard=false;

let currentPlayer=1;
let player1score=0;
let player2score=0;

function handleCardClick(event){

    const clickedCard = event.target;

    if(lockBoard || clickedCard == firstCard) return;

    clickedCard.textContent = clickedCard.dataset.symbol;

    if(!firstCard){
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    if(firstCard.dataset.symbol === secondCard.dataset.symbol){
        if(currentPlayer==1){
            player1score++;
            document.getElementById("p1-score").textContent=player1score;
        }
        else{
            player2score++;
            document.getElementById("p2-score").textContent=player2score;
        }
        resetBoard();
        checkWinner();
    }
    else{
        setTimeout(()=> {
            firstCard.textContent='';
            secondCard.textContent='';
            switchPlayer();
            resetBoard();
        },1000);
    }
    console.log("Card clicked:", clickedCard);
}

function resetBoard(){
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function switchPlayer(){
    if(currentPlayer===1){
        currentPlayer=2;
    }
    else{
        currentPlayer=1;
    }

    document.getElementById("turn-overlay").textContent="Player "+currentPlayer+"'s turn";
    
    const overlay=document.getElementById("turn-overlay");
    overlay.textContent="Player "+currentPlayer+"'s turn";
    overlay.style.opacity=1

    setTimeout(()=> {
        overlay.style.opacity=0;
    },1000);
}

window.onload = () => {
    const overlay=document.getElementById("turn-overlay");
    overlay.textContent="Player "+currentPlayer+"'s turn";
    overlay.style.opacity=1

    setTimeout(()=> {
        overlay.style.opacity=0;
    },1000);
}

function checkWinner(){
    const totalPairs=cards.length;
    if(player1score + player2score === totalPairs){
        let winnerText="";
        if(player1score > player2score){
            winnerText="🏆 Player 1 wins!!!";
        }
        else if(player2score > player1score){
            winnerText="🏆 Player 2 wins!!!";
        }
        else{
            winnerText="It's a tie!";
        }

        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.textContent = winnerText;
        winnerDisplay.style.opacity=1;
    }
}

