
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;
let difficultySettings={
    Easy: { mole:2000, plant:4000},
    Medium: { mole:1000, plant:2000},
    Hard: { mole:500, plant:1000}
}
window.onload = function(){
    setGame();
}

function setGame(difficulty="easy"){
    


    for (let i = 0; i<9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
        tile.addEventListener("click", selectTile);
    }
   
    console.log(difficulty)
    stopGame();
    let moleTime = difficultySettings[difficulty].mole
    let plantTime = difficultySettings[difficulty].plant
    console.log(moleTime, plantTime)
    moleInterval = setInterval(setMole,moleTime);
    plantInterval = setInterval(setPlant,plantTime);
}

function stopGame(){
    clearInterval(moleInterval);
    clearInterval(plantInterval);
}

function getRandomTile(){
    let num = (Math.floor(Math.random() * 9));
    return num.toString();
}

function setMole(){
    if (gameOver){
        return;
    }
    if (currMoleTile){
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./imgs/monty-mole.png";

    let num = getRandomTile();
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant(){
    if (gameOver){
        return;
    }
    if (currPlantTile){
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./imgs/piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num){
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if (gameOver){
        return;
    }
    if (this == currMoleTile){
        score+=10;
        document.getElementById("score").innerHTML = score.toString();
    }
    else if (this == currPlantTile){
        document.getElementById("score").innerHTML = "GAME OVER: " + score.toString();
        score = 0;
    }
}

function changeDifficulty(newDifficulty){
    stopGame();
    gameOver = false;

    document.getElementById("board").innerHTML = ""; 
    document.getElementById("score").innerHTML = "Score: 0"; 
    document.getElementById("current-mode").textContent = newDifficulty

    score = 0; 
    setGame(newDifficulty);
    console.log('hi')
}




