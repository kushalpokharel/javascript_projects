let min=1, max=10, winningNum=getWinningNum(min,max), guessesLeft=3;

const game = document.querySelector('#game'),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector('.max-num'), 
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


minNum.textContent= min;
maxNum.textContent= max;

game.addEventListener('mousedown',function(e){
  //console.log(e.target.classList);
  if(e.target.classList.contains('play-again'))
  {
    window.location.reload();
  }
});

guessBtn.addEventListener('click',function(){
  const input = parseInt(guessInput.value);
  
  if(isNaN(input) || input<min ||input>max)
  {
    showMessage(`Number should be between ${min} and ${max}`,'red');
    guessInput.style.borderColor = 'red';
  }
  else
  {
    if(input===winningNum)
    {
      gameOver(1,`${winningNum} is the correct answer. You win!`);
    }
    else
    {
      guessesLeft-=1;
      if(guessesLeft==0)
      {
        gameOver(0,`Game over! You lost. The correct number is ${winningNum}`);
      }
      else
      {
        guessInput.style.borderColor = 'red';
        showMessage(`${input} is wrong answer, ${guessesLeft} guesses left`,'red');
      }
    }
  }
});


function gameOver(win, msg){
  guessInput.disabled = true;
  if(win){cd 
    guessInput.style.borderColor = 'green';
    showMessage(msg,'green');
  }
  else{
    guessInput.style.borderColor = 'red';
    showMessage(msg,'red');
  }
  guessBtn.value = 'PLAY AGAIN';
  guessBtn.className += 'play-again';
}

function showMessage(msg,color)
{
  message.textContent=msg;
  message.style.color=color;
}

function getWinningNum(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}