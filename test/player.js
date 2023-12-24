// const Gb = require("./gameboard.js")
import { Gameboard } from "./gameboard.js"

export const player = {
    playerBoard: new Gameboard,
    playerAttacks: (input)=>{
        let opponent = computer.computerBoard.board
        let index = findIndex(input, opponent)
        opponent[index].hasHit = true     
    },

    playerPlaceShips: (orientation, cellNum, shipName)=>{
        let ships = player.playerBoard.ships
        

        for (let i=0; i < ships.length; i++){
            if (ships[i].name === shipName){
                function checking(i){
                    let board = player.playerBoard.board
                    let length = ships[i].length
                    let coords = board[cellNum].position
                    if(cellNum > 99 || checkPlacementValid(orientation, length, coords, board, cellNum)  === false || checkForCollision(orientation, length, board, cellNum) === false){
                        checking(i)
                    } else {
                        player.playerBoard.placeShip(ships[i], cellNum, orientation)
                    }
                }
                checking(i)
            }
           
        }
    
    }
 
}

export const computer = {
    computerBoard: new Gameboard,
    //next computer move
    computerCurrentMove: [],
    //all of the computer moves so far
    computerMoves: [],
    computerAttacks: ()=>{
        let opponent = player.playerBoard.board
        let compMovesArr = [...computer.computerMoves]
        let arrLength = compMovesArr.length
        let lastMove = compMovesArr [arrLength-1]
      
        if ((computer.computerCurrentMove.length === 0 ) && ((opponent[lastMove] === undefined) || (opponent[lastMove].hasShip === false))) {     
            let random = computer.randomInput()
            computer.computerCurrentMove.push(random)
            let index = computer.computerCurrentMove[0]
            return index
        } 
        
        else if (opponent[lastMove].hasShip === true && opponent[lastMove].hasHit === true){
            let possibleMoves = [lastMove+1, lastMove-1, lastMove+10, lastMove-10]
            //find the legal moves
            possibleMoves.forEach((move)=>{
            if (move >= 0 && move < 100 && (opponent[move].hasHit === false )){
                computer.computerCurrentMove.push(move)
            }})
            computer.verifyLegalMoves()
            let index = computer.computerCurrentMove[0]
            return index
        } 
        else if (computer.computerCurrentMove.length !== 0 && opponent[lastMove].hasShip === false) {
            computer.verifyLegalMoves()
            let index = computer.computerCurrentMove[0]
            return index
        }
        
      

        
    },
    computerHits: (index)=>{
        let playerUI = document.querySelectorAll(".cell")
        let opponent = player.playerBoard.board

       

        //add move into the array that contains all the computer moves
        computer.computerMoves.push(index)
        //make the playerboard at that position has hit
        opponent[index].hasHit = true;
        //player ui at the index at isHit to make it invis
        playerUI[index].classList.add("isHit")
        //empty the current computer move from the computermove array?
        computer.computerCurrentMove.shift()
    },
    verifyLegalMoves: ()=>{
        let opponent = player.playerBoard.board

        computer.computerCurrentMove.forEach(move =>{
            if (opponent[move].hasHit === false) {
                computer.computerCurrentMove.push(move)
            } 
        })
        computer.computerCurrentMove = [...new Set(computer.computerCurrentMove)]
    },
 
    computerPlaceShips: ()=>{
        // computer.computerBoard.placeShip(a,b,c)
        let ships = computer.computerBoard.ships
        //go through each ship to place.
        for (let i = 0; i < ships.length; i++){
             
            //i want to write a function to check if index is at more than 99
            
            //then i want to check if placement is valid. if not valid, i want to CALLBACK to place this ship again. so maybe create a random pos

            function checking(i){
                let randomOrient = randomOrientation()           
                let board = computer.computerBoard.board
                let length = ships[i].length
                let randomIndex = computer.randomIndex();
                let randomCoordinate = board[randomIndex].position

                    if (randomIndex < 99 && checkPlacementValid(randomOrient, length, randomCoordinate, board, randomIndex) === true && checkForCollision(randomOrient, length, board, randomIndex) === true) {
                        computer.computerBoard.placeShip(ships[i], randomIndex, randomOrient)   
                    } else {
                         //place the ship at that coordinate
                         checking(i)
                    }
           
            }          
        checking(i)
        }
    },
    //this random input is to HIT the enemy
    randomInput: ()=>{
        let random = Math.floor(Math.random()*100)
        let opponent = player.playerBoard.board
        if (computer.computerMoves !== undefined){
            computer.computerMoves.forEach(move=>{
                if (move === random){
                    random = Math.floor(Math.random()*100)
                    return random
                }
                else {
                    return random
                }
            })
        }       

        if (opponent[random].hasHit === true) {
            random = Math.floor(Math.random()*100)
            return random
        } else {
            return random
        }
    },
    //this is to randomly place for computer
    randomIndex: ()=>{
        let random = Math.floor(Math.random() * 10 * 10)
        return random;
    },


}

//this is a helper function. no need to export.
const findIndex = (coords, board) =>{
    for (let i = 0; i < board.length; i ++){
        if(board[i].position[0] === coords[0] && board[i].position[1] === coords[1]){
            return i
        }
    }
}

export const checkPlacementValid = (orient, length, coord) =>{
//ships can't place outside the box      
if (orient === "vertical"){           
    if (length === 5) {
        if (coord[0] === "G" || coord[0] === "H" ||coord[0] === "I" || coord[0] === "J" ){
            return false
        } else {
            return true
        }
    }else if (length === 4) {
        if (coord[0] === "H" ||coord[0] === "I" || coord[0] === "J" ){
            return false
        } else {
            return true
        }
    }else if (length === 3) {
        if (coord[0] === "I" || coord[0] === "J" ){
            return false
        } else {
            return true
        }
    }else if (length === 2) {
        if (coord[0] === "J" ){
            return false
        } else {
            return true
        }
    }
} else {
    if (length === 5) {
        if(coord[1] >= 7){
            return false
        }else {
            return true
        }
    }else if (length === 4) {
        if(coord[1] >= 8){
            return false
        }else {
            return true
        }
    }else if (length === 3) {
        if(coord[1] >= 9){
            return false
        }else {
            return true
        }
    }else if (length === 2) {
        if(coord[1] >= 10){
            return false
        }else {
            return true
        }
    }
}     
}

export const randomOrientation = ()=>{
    let random = Math.floor(Math.random()*2)
    if(random === 1) {
        return "horizontal"
    } else {
        return "vertical"
    }
}

export const checkForCollision = (orient, length, board, randomIndex) =>{
    
    if (orient === "vertical"){
        for (let i = 0; i < length; i++){
            if (board[randomIndex + (i*10)].hasShip === true) {
                return false
            }
        }
        return true
    }else {
        for (let i = 0; i < length; i++){
            if (board[randomIndex + (i*1)].hasShip === true) {
                console.log("ERROR COLLISION")
                return false
            }
        }
        return true
    }
    
}


// module.exports = {player, computer}