module.exports = (app) => {
  
    app.get('/', (request, response) => {
        response.json(
            {
                "result":"Number Guessing Game",
                "error":"This API supports only POST request(s)",                    
                "type":0
            }                        
        );    
    });
    
    app.post('/checkGuess', (request, response) => {        
        let randomNumber = Number(request.body.randomNumber);
        let userGuess = Number(request.body.userGuess);
        let guessCount = Number(request.body.guessCount);        
        
        let lowOrHi = '';
        let result = '';
        let type = 0;   
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
        
        response.json(
            {
                "result":result,
                "error":lowOrHi,                    
                "type":type
            }                        
        );      
    });
};
