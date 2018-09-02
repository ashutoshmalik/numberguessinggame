## Number Guessing Game

Its an implementation of simple number guessing game. It should choose a random number between 1 and 100, then challenge the player to guess the number in 10 turns. After each turn, the player should be told if they are right or wrong — and, if they are wrong, whether the guess was too low or too high. It should also tell the player what numbers they previously guessed. The game will end once the player guesses correctly, or once they run out of turns. When the game ends, the player should be given an option to start playing again.


### Application directory structure

This structure contains two implementations of the same problem. First, without using Node.js API and Second, with Node.js API.
- "app" folder contains REST API implementation using Node.js
- "public0" folder contains first implementation.
- "public" folder used for the second.

![Updated GUI](https://github.com/ashutoshmalik/numberguessinggame/blob/master/NumberGuessingGame/public/images/structure.PNG)

### How to run

This application is developed using NetBeans IDE. Its using port 8383 for the application by default. We have to run Node.js API server from its base folder "app". This API available on port 3000.

![API CONSOLE](https://github.com/ashutoshmalik/numberguessinggame/blob/master/NumberGuessingGame/public/images/api_console.PNG)

### Task list
```

1.Generate a random number between 1 and 100.
2.Record the turn number the player is on. Start it on 1.
3.Provide the player with a way to guess what the number is.
4.Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
5.Next, check whether it is the correct number.
6.If it is correct:
        •Display congratulations message.
        •Stop the player from being able to enter more guesses (this would mess the game up).
        •Display control allowing the player to restart the game.
7.If it is wrong and the player has turns left:
        •Tell the player they are wrong.
        •Allow them to enter another guess.
        •Increment the turn number by 1.
8.If it is wrong and the player has no turns left:
        •Tell the player it is game over.
        •Stop the player from being able to enter more guesses (this would mess the game up).
        •Display control allowing the player to restart the game.
9.Once the game restarts, make sure the game logic and UI are completely reset, then go back to step 1.

```

### Implementation

This implementation has an HTML page, which helps the player to submit his/her guess to RESTful API. 

![Game GUI](https://github.com/ashutoshmalik/numberguessinggame/blob/master/NumberGuessingGame/public/images/gaemInit.png)


### Ajax POST call to submit user guess

```
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
```

### Ajax POST request handling
```
var randomNumber = Number(request.body.randomNumber);
var userGuess = Number(request.body.userGuess);
var guessCount = Number(request.body.guessCount);        

var lowOrHi = '';
var result = '';
var type = 0;   
if(userGuess === randomNumber) {
    result = 'Congratulations! You got it right!';     
} else if(guessCount === 10) {
    result = 'GameOver!';
    type = -1;
} else {
    result = 'Wrong!';
    type = 1;
    if(userGuess < randomNumber) {
        lowOrHi = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
        lowOrHi = 'Last guess was too high!';
    }
}

```

In response, API calculates the user guess against the actual number and send back the result in JSON format.

```
{
        result: "Wrong!", 
        error: "Last guess was too low!", 
        type: 1
}

Description of the API response:

"result": Final result of the API call based on the submitted parameters
"error": Reason of the  result
"type": Represent the what next action user can perform.
```

After receiving the response from API, ajax callback function parse the response and update the user if the guess correct or user needs to try again if possible.

![Updated GUI](https://github.com/ashutoshmalik/numberguessinggame/blob/master/NumberGuessingGame/public/images/game.PNG)




