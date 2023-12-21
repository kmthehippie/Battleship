// const Gb = require("./gameboard.js")

import { Gameboard } from "./gameboard.js"

export const player = {
    playerBoard: new Gameboard,
    playerAttacks: (input)=>{
        let opponent = computer.computerBoard.board
        let index = findIndex(input, opponent)
        opponent[index].hasHit = true     
    },
    playerPlaceShips: (a,b,c)=>{
        player.playerBoard.placeShip(a,b,c)
    }
 
}

export const computer = {
    computerBoard: new Gameboard,
    computerAttacks: ()=>{
        let opponent = player.playerBoard.board
        let index = computer.randomInput()
        opponent[index].hasHit = true     
    },
    computerPlaceShips: (a,b,c)=>{
        computer.computerBoard.placeShip(a,b,c)
    },
    randomInput: ()=>{
        let random = Math.floor(Math.random()*100)
        let opponent = player.playerBoard.board

        if (opponent[random].hasHit === true) {
            random = Math.floor(Math.random()*100)
            return random
        } else {
            return random
        }
    }

}

//this is a helper function. no need to export.
const findIndex = (coords, board) =>{
    for (let i = 0; i < board.length; i ++){
        if(board[i].position[0] === coords[0] && board[i].position[1] === coords[1]){
            return i
        }
    }
}
// module.exports = {player, computer}