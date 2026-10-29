
let score=JSON.parse(localStorage.getItem('score'))||
  {
    wins:0,
    loose:0,
    tie:0
    }    

  // if(!score){
  //   score={
  //       wins:0,
  //       loose:0,
  //       tie:0
  //   }
  // }

  //autoPlaying feature 
  let isautoPlaying=false;
  let intervalId;
  function autoPlay(){
  if(!isautoPlaying){
    intervalId=setInterval(function(){
    const playermove=pickcomputermove();
    playgame(playermove);
  },1000);
    isautoPlaying=true;
    document.querySelector('.auto-play-button').innerHTML='StopPlaying';
  }
  else{

      clearInterval(intervalId);
      isautoPlaying=false;
      document.querySelector('.auto-play-button').innerHTML='AutoPlaying';
  }
}
document.querySelector('.js-rock-button')
  .addEventListener('click',()=>{
    playgame('rock');
  });

document.querySelector('.js-papper-button')
  .addEventListener('click',()=>{
    playgame('Papper');
  });

document.querySelector('.js-Scissor-button')
  .addEventListener('click',()=>{
    playgame('Scissor');
  });
document.querySelector('.js-autoPlay')
  .addEventListener('click',()=>{
    autoPlay();
  });
document.querySelector('.js-reset-score-button')
  .addEventListener('click',()=>{
          showResetConfirmation();
  });

  //playwith keyBord
document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playgame('rock');
  }
  else if(event.key==='p'){
    playgame('Papper');
  }
  else if(event.key==='s'){
    playgame('Scissor');

  }else if(event.key==='a'){
    autoPlay();

  }else if(event.key==='Backspace'){
         showResetConfirmation();
  }
});

function showResetConfirmation(){
  document.querySelector('.js-reset-confirmation')
   .innerHTML=`
    Are you sure want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">
    Yes
    </button>
    <button class="js-reset-confirm-no reset-confirm-button">
    No
    </button>
   `;
   document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click',()=>{
        score.wins=0;
        score.loose=0;
        score.tie=0;
        localStorage.removeItem('score');
        updatescore();
        hideResetConfirmation();
    });
}

function hideResetConfirmation(){
  document.querySelector('.js-reset-confirmation')
    .innerHTML='';
}

  //manual playing
  function playgame(playermove){

        const computermove=pickcomputermove();

            let result='';

        if(playermove==='rock'){
      
                if(computermove==='rock'){
                  result='tie';
                }
                else if(computermove==='Papper'){
                  result='you loose'
                }
                else if(computermove==='Scissor'){
                  result= 'you won'
                }
              }
          else if(playermove==='Papper'){
              
                if(computermove==='rock'){
                  result='you won';
                }
                
                else if(computermove==='Papper'){
                  result='tie'
                }
                else if(computermove==='Scissor'){
                  result= 'you loose'
                }
             }
          else if(playermove==='Scissor'){

                if(computermove==='rock'){
                  result='you loose';
                }
                else if(computermove==='Papper'){
                  result='you won'
                }
                else if(computermove==='Scissor'){
                  result= 'tie'
                }
             }

          if(result==='you won'){
            score.wins++;
          }
          else if(result==='you loose'){
            score.loose++;
          }
          else if(result==='tie'){
            score.tie++;
          }
          //save the local storage
          localStorage.setItem('score',JSON.stringify(score));

          document.querySelector('.js-result')
             .innerHTML=`${result}`;
          
          document.querySelector('.js-moves')
                .innerHTML=`<img src="images/${playermove}-emoji.png" class="move-icon">
                computer
                <img src="images/${computermove}-emoji.png" class="move-icon">`;

          updatescore();

          // alert(`you picked ${playermove} and computer picked ${computermove}.${result}
          // wins:${score.wins} loose:${score.loose} tie:${score.tie}`);
          }

          function updatescore(){
          document.querySelector('.js-score')
          .innerHTML=`wins:${score.wins} loose:${score.loose} tie:${score.tie}`;
          }
    // generate randomNumber code
    function pickcomputermove(){

                let computermove='';

                const randomNumber=Math.random();

                if(randomNumber>=0 && randomNumber<1/3){
                    computermove='rock';
                }
                else if(randomNumber>=1/3 && randomNumber<2/3){
                      computermove='Papper';
                }
                else if(randomNumber>=2/3 && randomNumber<1){
                        computermove='Scissor';
                }

                return computermove;
          
            }