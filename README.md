## Number Guessing Game

Its an implementation of simple number guessing game. It should choose a random number between 1 and 100, then challenge the player to guess the number in 10 turns. After each turn, the player should be told if they are right or wrong — and, if they are wrong, whether the guess was too low or too high. It should also tell the player what numbers they previously guessed. The game will end once the player guesses correctly, or once they run out of turns. When the game ends, the player should be given an option to start playing again.


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
