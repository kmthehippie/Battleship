// const { createShip } = require("./ship");

function gameboard (player){
    const boardDiv = document.querySelector(".gameboard")
    const playerDiv = document.querySelector(".player")
    let col = 10;
    let row = 10;
    let playerName = player;
    let board = [];
    let spawnBoard = function(){
        const createPlayer = document.createElement("h3")
        createPlayer.textContent = playerName;
        playerDiv.appendChild(createPlayer);
        for (let r = 0; r < row; r++){
            for (let c = 0; c < col; c++){            
                const createCell = document.createElement("div");
                createCell.classList = "cell";
                createCell.id = `[${r}, ${c}]`
                board.push([r,c]);
                boardDiv.appendChild(createCell);
            }
        }
        const cells = document.querySelectorAll(".cell")
        cells.forEach(cell=>{
            cell.addEventListener("click",()=>{
                console.log(cell.id)
                return cell.id
            })
        })
        return board
    }
    
    
    return { playerName, board, spawnBoard }
}

let firstBoard = gameboard("Player One")
firstBoard.spawnBoard()



module.exports = { gameboard, firstBoard}
