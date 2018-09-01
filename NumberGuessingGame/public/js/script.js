var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector('#lowOrHi');

var guessSubmit = document.querySelector('#guessSubmit');
var guessField = document.querySelector('#guessField');

var guessCount = 1;
var resetButton;

guessField.focus();

function checkGuess() {
    let http = new XMLHttpRequest();
    let url = 'http://localhost:3000/checkGuess';    
    let data = {};
    data.randomNumber = randomNumber;
    data.userGuess = guessField.value;
    data.guessCount = guessCount;
    
    http.open('POST', url, true);        
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type','application/json');
    http.send(JSON.stringify(data));   
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState === 4 && http.status === 200) {
            let responseData = JSON.parse(http.responseText);
            
            if(guessCount === 1) {
                guesses.textContent = 'Previous guesses: ';
            }
            guesses.textContent += guessField.value + ' ';
            if(responseData.type === 0) {
                lastResult.textContent = responseData.result;
                lastResult.style.backgroundColor = 'green';
                lowOrHi.textContent = '';
                setGameOver();
            } else if(responseData.type === -1) {
                lastResult.textContent = responseData.result;
                lowOrHi.textContent = '';
                setGameOver();
            } else {
                lastResult.textContent = responseData.result;
                lastResult.style.backgroundColor = 'red';
                lowOrHi.textContent = responseData.error;               
            }
            guessCount++;
            guessField.value = '';
            guessField.focus();
        }
    };   
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    var resetParas = document.querySelectorAll('#resultParas p');
    for(var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}