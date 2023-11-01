const grid = document.querySelector("div.gridItemContainer")
const buttons = document.querySelectorAll("button")

let display =""
let playerMode = 1

const rows = 6
const cols = 7

const nestedArray = Array.from({ length: rows }, () => 
  Array.from({ length: cols }, () => 0)
);

for(let i =0; i < 6; i++){
    for(let j =0; j < 7; j++){
        nestedArray[i][j] = 0;
        
        display += `<div class="gridItem"></div>`
    }
}

grid.innerHTML = display;

const dropToken=(btnValue) =>{
  const slots = document.querySelectorAll("div.gridItem")
  display =""

 if(playerMode == 3)
 { 
  playerMode =1; //changes pack to player 1
 }
  //places piece  
  for(let c =5; c >= 0; c--){
    if(nestedArray[c][btnValue] == 0 ){
      nestedArray[c][btnValue] = playerMode
      playerMode++ // changes palyer
      break;
    }
    else if(nestedArray[0][btnValue] >= 1){
      console.log("full column"); 
      break;
    }
  }

  for(let i =0; i < 6; i++){
    for(let j =0; j < 7; j++){
        display += `<div class="gridItem"></div>` // make a system that allows you to distinguish 
    }                                             // which one is player 1 and player 2
  }
  grid.innerHTML = display;


  //checks if board is full
  let flag = true;
  for(let i =0; i < 6; i++){
    for(let j =0; j < 7; j++){
        if(nestedArray[i][j] == 0)
        {
          flag = false
        }
      }
  }
  if(flag==true)
  {
    console.log("Tie")
  }
  else 
  {
    console.log("game is till going")
  }
}

buttons.forEach((button)=> {
  button.addEventListener("click",(e) => dropToken(e.target.dataset.value));
  });

