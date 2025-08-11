const turnTracker = document.getElementById('turn-tracker');
const playerCards = document.getElementById('player-cards');
const computerCards = document.getElementById('computer-cards')

const playerHandValue = document.getElementById('player-hand-value')
const computerHandValue = document.getElementById('computer-hand-value')

const drawCardButton = document.getElementById('draw-card')
const stopButton = document.getElementById('stop')
const restartButton = document.getElementById('restart-button')

const playerScoreLabel = document.getElementById('player-score');
const computerScoreLabel = document.getElementById('computer-score')

let playerNumber = 0;
let computerNumber = 0;

let gameContinuing = true;
let playerContinuing = true;
let computerContinuing = true;

let computerScore = 0;
let playerScore = 0;

turnTracker.innerHTML = `Player's`
drawCardButton.onclick = () => {
    if (gameContinuing) {
        if (playerContinuing) {
            drawCardPlayer();
        }
        if (computerContinuing) {
            turnTracker.innerHTML = `Computer's`
            disableButtons();
            setTimeout(drawCardComputer, 2000);
        }
    }

}

stopButton.onclick = () => {
    playerCantinuing = false;
}

function getRandomNum(max) {
    return Math.floor(Math.random() * max)
}
function drawCardPlayer() {
    let card = document.createElement('span');
    // Create ASCI Card
    let num = getRandomNum(11)
    let cardASCI = createCardASCI(num + 1);
    //
    playerNumber += num + 1;
    playerHandValue.innerHTML = `${playerNumber}`;
    checkGameEnd(playerNumber);


    card.innerHTML = `<pre style="display:inline-block; margin:0;">${cardASCI}</pre>`;
    playerCards.appendChild(card);
}

function drawCardComputer() {
    let card = document.createElement('span');
    // Create ASCI Card
    let num = getRandomNum(11)
    let cardASCI = createCardASCI(num + 1);
    //
    computerNumber += num + 1;
    computerHandValue.innerHTML = `${computerNumber}`;
    checkGameEnd(computerNumber);


    card.innerHTML = `<pre style="display:inline-block; margin:0;">${cardASCI}</pre>`;
    computerCards.appendChild(card);
    turnTracker.innerHTML = "Player's"
    if (!playerContinuing && gameContinuing) {
        setTimeout(drawCardComputer, 2000);
    }
    let shouldContinue = shouldComputerContinue();
    if (!shouldContinue) {
        computerContinuing = false;
        computerHandValue.innerHTML = `${computerNumber}, computer stopped!`
    }
}

function createCardASCI(num) {
    if (num > 9) {
        const baseCard = ` _ _ _ _ _
|${num}             | 
|                | 
|                | 
|                | 
|                | 
|                | 
|             ${num}| 
 _ _ _ _ _`
        return baseCard;
    }
    else {
        const baseCard = ` _ _ _ _ _
|${num}              | 
|                | 
|                | 
|                | 
|                | 
|                | 
|              ${num}| 
 _ _ _ _ _`
        return baseCard;
    }
}

function shouldComputerContinue() {
    if (playerContinuing && computerNumber < 17 || playerContinuing && playerNumber > computerNumber && playerNumber > 17) {
        return true;
    }
    if (!playerContinuing) {
        if (computerNumber > playerNumber) {
            return false;
        }
    }
}

stopButton.onclick = () => {
    playerContinuing = false;
    stopButton.disabled = true;
    drawCardButton.disabled = true;
    if (computerContinuing) {
        drawCardComputer();
    }
    else {
        checkGameEnd();
    }
    playerCards.classList.add('stopped')
}

function checkGameEnd(num) {
    if (!playerContinuing && !computerContinuing) {
        if (playerNumber > computerNumber) {
            playerHandValue.innerHTML = `${playerNumber}, you win!`
            playerScore += 1;
            playerScoreLabel.innerHTML = playerScore;
        }
        else if (playerNumber < computerNumber) {
            playerHandValue.innerHTML = `${playerNumber}, you lose!`
            computerScore += 1;
            computerScoreLabel.innerHTML = computerScore
        }
        else {
            playerHandValue.innerHTML = `${playerNumber}, it's a tie!!`
        }
    }
    if (playerNumber == 21) {
        playerHandValue.innerHTML = `${num}, You win!`
        computerContinuing = false;
        gameContinuing = false;
        playerScore += 1;
        playerScoreLabel.innerHTML = playerScore;
    }
    else if (playerNumber > 21) {
        playerHandValue.innerHTML = `${num}, You Lose!!`
        gameContinuing = false;
        computerContinuing = false;
        computerScore += 1;
        computerScoreLabel.innerHTML = computerScore
    }
    else if (computerNumber == 21) {
        computerHandValue.innerHTML = `${num}, Computer wins!`
        gameContinuing = false;
        computerContinuing = false;
        computerScore += 1;
        computerScoreLabel.innerHTML = computerScore
    }
    else if (computerNumber > 21) {
        playerHandValue.innerHTML = `${playerNumber}, Computer went over 21, You Win!!`
        gameContinuing = false;
        computerContinuing = false;
        playerScore += 1;
        playerScoreLabel.innerHTML = playerScore;

    }
    if (!gameContinuing || !playerContinuing && !computerContinuing) {
        endGame()
    }
}

function endGame() {
    stopButton.disabled = true;
    drawCardButton.disabled = true;
    restartButton.style.visibility = 'visible'
}

function disableButtons() {
    stopButton.disabled = true;
    drawCardButton.disabled = true;
    setTimeout(() => {
        stopButton.disabled = false;
        drawCardButton.disabled = false;
    }, 2000);
}
restartButton.onclick = () => {
    playerCards.innerHTML = '';
    computerCards.innerHTML = '';
    playerContinuing = true;
    computerContinuing = true;
    gameContinuing = true;
    playerNumber = 0;
    computerNumber = 0;
    playerHandValue.innerHTML = "0";
    computerHandValue.innerHTML = "0";
    stopButton.disabled = false;
    drawCardButton.disabled = false;
    restartButton.visibility = 'hidden'
}

restartButton.style.visibility = 'hidden';
