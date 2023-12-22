// const Coordinate = require("./coordinate.js")
// const Ship = require("./ship.js")

import { Coordinate } from "./coordinate.js"
import { Ship } from "./ship.js"
//this is a factory function
export const Gameboard = function() {
    let _board = [];
    let _ships = [];

    let _spawnBoard = ()=>{
        let xPos;
        let yPos;
        
        for (let j = 65; j < 75; j++){
            for (let i = 1; i < 11; i ++){
                let alph = String.fromCharCode(j);
                xPos = i;
                yPos = alph;
                let newCoords= new Coordinate(yPos, xPos); 
                _board.push(newCoords)               
            }
        }       
    };
    _spawnBoard()
    let createShips = ()=>{
        let carrier = new Ship("carrier", 5)
        let battleship = new Ship("battleship", 4)
        let destroyer = new Ship("destroyer", 3)
        let submarine = new Ship("submarine", 3)
        let patrolBoat = new Ship("patrolBoat", 2)
        _ships.push(carrier)
        _ships.push(battleship)
        _ships.push(destroyer)
        _ships.push(submarine)
        _ships.push(patrolBoat)
    };
    createShips()

    let findIndex = (coords) =>{
        for (let i = 0; i < _board.length; i ++){
            if(_board[i].position[0] === coords[0] && _board[i].position[1] === coords[1]){
                return i
            }
        }
    }

    let _placeShip = (shipToPlace, selectedCoords, orientation)=>{

        let shipLength = (shipToPlace.length)
        // let indexOfSelectedCoords = findIndex(selectedCoords);
        
        let shipBtns = document.querySelectorAll(".ship-btn")

        
        if (shipToPlace.position.length === 0){
            if (orientation === "vertical") {
                for (let i = 0; i < shipLength; i ++){
                    _board[selectedCoords + (i*10)].hasShip = true;
                    shipToPlace.position.push(_board[selectedCoords+ (i*10)].position) 
                }
                
            } else if (orientation === "horizontal"){
                for (let i = 0; i < shipLength; i ++){
                    _board[selectedCoords + (i)].hasShip = true;
                    shipToPlace.position.push(_board[selectedCoords+i].position) 
    
                }
            }
        } else if (shipToPlace.position.length !== 0){
            shipBtns.forEach(shipBtn =>{
                if (shipBtn.classList[1] === shipToPlace.name){
                    shipBtn.classList.add("inactive")
                }
            })
        }

       

        
    }

    let _receiveAttack = (coords)=>{
        let indexOfAttack = findIndex(coords)
        if (_board[indexOfAttack].hasHit === true) {
            //error just skip
            console.log("You can't hit somewhere you hit before")
            return
        }
        //find out if it hit the ship first
        for (let i = 0; i < _ships.length; i ++){
            for (let j = 0; j < _ships[i].position.length; j++){
                let shipsCoords = _ships[i].position
                if (coords[0] === shipsCoords[j][0] && coords[1] === shipsCoords[j][1]){
                    //here we increase the ship has been hit function
                    _ships[i].isHit();
                }
            }            
        }
        //no matter what, the coordinate has been hit. 
        _board[indexOfAttack].hasHit = true;

    }

    let _allShipSunk = ()=>{
        let numSunk = 0
        for(let i = 0; i < _ships.length; i++){
            if (_ships[i].sunk === true){
                numSunk++
            }
        }
        if (numSunk === _ships.length){
            return true
        }
        return false
    }

    return {
        board: _board,
        ships: _ships,
        placeShip: _placeShip,
        receiveAttack: _receiveAttack,
        allShipSunk: _allShipSunk
    }
}



// module.exports = Gameboard;