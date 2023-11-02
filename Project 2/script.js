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

function checkForWin(player) {
  //Check for horizontal win
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        nestedArray[row][col] === player &&
        nestedArray[row][col + 1] === player &&
        nestedArray[row][col + 2] === player &&
        nestedArray[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  //Check for vertical win
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        nestedArray[row][col] === player &&
        nestedArray[row + 1][col] === player &&
        nestedArray[row + 2][col] === player &&
        nestedArray[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  //Check for diagonal win (top left to bottom rigjt)
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        nestedArray[row][col] === player &&
        nestedArray[row + 1][col + 1] === player &&
        nestedArray[row + 2][col + 2] === player &&
        nestedArray[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  //Check for diagonal win (bottom left to top right)
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        nestedArray[row][col] === player &&
        nestedArray[row - 1][col + 1] === player &&
        nestedArray[row - 2][col + 2] === player &&
        nestedArray[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

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
        display += `<div class="gridItem" id = "player${nestedArray[i][j]}">${nestedArray[i][j]}</div>` // make a system that allows you to distinguish 
    }                                             // which one is player 1 and player 2
  }
  grid.innerHTML = display;

  //Chceck for win
  if (checkForWin(playerMode - 1)) {
    console.log(`Player ${playerMode - 1} wins`);
  } else {
    //checks if board is full
    let flag = true
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
}

buttons.forEach((button)=> {
  button.addEventListener("click",(e) => dropToken(e.target.dataset.value));
  });

