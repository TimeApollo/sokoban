const map = [
    "CCWWWWWC",
    "WWW   WC",
    "WOSB  WC",
    "WWW BOWC",
    "WOWWB WC",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
  ];

const main = document.querySelector("main");
const machoke = document.getElementById("machoke");
machoke.style.width = 'calc(100vw / ' + map[0].length + ')';
machoke.style.height = 'calc(100vh / ' + map.length + ')';

let numOfBoxes = 0;
let numOfBoxesInPosition = 0;
let rowIndex = 0;
for (const row of map) {
    let newRow = createDivRow("row", rowIndex, map.length)
    let cellIndex = 0;
    for (let letter of row) {
        if (letter === " ") {
            letter = "space"
        }
        if (letter === "B"){
            numOfBoxes++;
        }
        if (letter === "X"){
            numOfBoxesInPosition++;
        }
        createCell(letter, newRow, row.length , cellIndex )
        cellIndex++;
    }
    rowIndex++;
}

let winningNumberOfBoxes = numOfBoxes + numOfBoxesInPosition;
console.log(winningNumberOfBoxes);
let start = document.getElementsByClassName("S");
start[0].appendChild(machoke);
let currentPosition = start[0];
document.addEventListener('keydown', movePlayer);
let Winner = false;

function createDivRow(className, Id, mapLength) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add(className);
    rowContainer.dataset.row = Id;
    rowContainer.style.height = 'calc(100vh / ' + mapLength + ')'
    main.appendChild(rowContainer);
    return rowContainer;
}

function createCell(className, rowContainer, lenghtOfRow ,cellIndex) {
    const cell = document.createElement('div');
    cell.classList.add(className);
    if(className === "B"){
        cell.classList.add("space")
    }
    if(className === "X"){
        cell.classList.add("O" , "B")
    }
    cell.style.width = 'calc(100vw / ' + lenghtOfRow + ')'
    cell.dataset.column = cellIndex;
    rowContainer.appendChild(cell);
    return cell;
}

function movePlayer(event){
    if(Winner){
        return;
    }
    const keyName = event.key;
    let nextPosition = currentPosition;
    let thirdPosition = nextPosition;
    let currentColumnValue = 0;
    let nextRowElement = 0;
    let thirdRowElement = 0;
    console.log('keydown event\n\n' + 'key: ' + keyName);
    //down key functionality
    if (keyName === "ArrowDown") {
        if(currentPosition.parentElement.dataset.row == map.length - 1){
            nextPosition = currentPosition;
            return;
        }
        currentColumnValue = Number(currentPosition.dataset.column);
        nextRowElement = currentPosition.parentElement.nextSibling;
        nextPosition = nextRowElement.childNodes[currentColumnValue];
        thirdRowElement = nextPosition.parentElement.nextSibling;
        thirdPosition = thirdRowElement.childNodes[currentColumnValue];
        if(nextPosition.classList.contains("B")){
            if(!thirdPosition.classList.contains("W") && !thirdPosition.classList.contains("B")){
                if(thirdPosition.classList.contains("O")){
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B" , "X");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                    numOfBoxesInPosition++;
                }else{
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                }
            }else{
                nextPosition = currentPosition;
            }
        }
        else if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(machoke)
        }else{
            nextPosition = currentPosition;
        }
    //up key functionality
    } else if (keyName === "ArrowUp") {
        if(currentPosition.parentElement.dataset.row == map.length - 1){
            nextPosition = currentPosition;
            return;
        }
        currentColumnValue = Number(currentPosition.dataset.column);
        nextRowElement = currentPosition.parentElement.previousSibling;
        nextPosition = nextRowElement.childNodes[currentColumnValue];
        thirdRowElement = nextPosition.parentElement.previousSibling;
        thirdPosition = thirdRowElement.childNodes[currentColumnValue];
        if(nextPosition.classList.contains("B")){
            if(!thirdPosition.classList.contains("W") && !thirdPosition.classList.contains("B")){
                if(thirdPosition.classList.contains("O")){
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B" , "X");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                    numOfBoxesInPosition++;
                }else{
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                }
            }else{
                nextPosition = currentPosition;
            }
        }
        else if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(machoke)
        }else{
            nextPosition = currentPosition;
        }
    //left key functionality
    } else if (keyName === "ArrowLeft") {
        if(currentPosition.dataset.column == 0){
            nextPosition = currentPosition;
            return;
        }
        nextPosition = currentPosition.previousSibling;
        thirdPosition = nextPosition.previousSibling;
        if(nextPosition.classList.contains("B")){
            if(!thirdPosition.classList.contains("W") && !thirdPosition.classList.contains("B")){
                if(thirdPosition.classList.contains("O")){
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B" , "X");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                    numOfBoxesInPosition++;
                }else{
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                }
            }else{
                nextPosition = currentPosition;
            }
        }
        else if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(machoke)
        }else{
            nextPosition = currentPosition;
        }
    //right key functionality
    } else if (keyName === "ArrowRight") {
        if(currentPosition.dataset.column == map[0].length-1){
            nextPosition = currentPosition;
            return;
        }
        nextPosition = currentPosition.nextSibling;
        thirdPosition = nextPosition.nextSibling;
        if(nextPosition.classList.contains("B")){
            if(!thirdPosition.classList.contains("W") && !thirdPosition.classList.contains("B")){
                if(thirdPosition.classList.contains("O")){
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B" , "X");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                    numOfBoxesInPosition++;
                }else{
                    if(nextPosition.classList.contains("X")){
                        nextPosition.classList.remove("X");
                        numOfBoxesInPosition--;
                    }
                    thirdPosition.classList.add("B");
                    nextPosition.classList.remove("B");
                    nextPosition.appendChild(machoke);
                }
            }else{
                nextPosition = currentPosition;
            }
        }
        else if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(machoke)
        }else{
            nextPosition = currentPosition;
        }
    }
    currentPosition = nextPosition;
    winCondition(currentPosition)
    if(Winner){
        const winBox = document.createElement("div");
        const winBoxText = document.createElement("div");
        winBox.style.backgroundColor = "green";
        winBox.style.margin = "auto";
        winBox.style.color = "white";
        winBox.style.height = "20vh";
        winBox.style.width = "50vw";
        winBox.style.textAlign = "center";
        winBox.style.verticalAlign = "middle";
        winBox.style.position = "absolute";
        winBox.style.top = "0px";
        winBox.style.left = "25vw";
        winBoxText.textContent = "You Win!!!!!!!!!"
        winBoxText.style.position = 'absolute';
        winBoxText.style.top = '45%';
        winBoxText.style.width = '100%';
        winBoxText.style.textAlign = "center";
        winBox.appendChild(winBoxText);
        document.body.appendChild(winBox);
    }
}

function winCondition(position){
    if(winningNumberOfBoxes === numOfBoxesInPosition){
        Winner = true;
    }
}


