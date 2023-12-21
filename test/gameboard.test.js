
// const Gameboard = require("./gameboard.js")

import { Gameboard } from "./gameboard"

describe ('Gameboard', ()=>{
    it("spawn 10x10 coordinates in gameboard", ()=>{
        let gb = new Gameboard()
        expect(gb.board.length).toEqual(100);
        expect(gb.board[0].position).toEqual(["A",1])       
    })
    
    let gb;
        beforeEach(()=>{
            gb = new Gameboard();
        })

  
    it("place ships = what kind of ship carrier 5, battleship 4, destroyer 3,submarine 3,patrol boat 2; at specific coord by calling the ship fn. if vertical vs horizontal. (5 ships per player but create 1 ship first)", ()=>{
        expect(gb.ships[0].length).toBe(5)
        gb.placeShip(gb.ships[0], ["A", 1], "horizontal")
        expect(gb.board[0].hasShip).toBe(true)
        expect(gb.ships[0].position).toEqual([["A", 1],["A", 2],["A", 3],["A", 4],["A", 5]])

    })


    it("receiveAttack function takes coords and determines if ship is hit or not. if hit, need to send the hit function to correct ship. records the coordinates of missed", ()=>{
        gb.placeShip(gb.ships[0], ["A", 1], "horizontal")
        expect(gb.board[0].hasShip).toBe(true)
        gb.receiveAttack(["A", 1]);
       
        expect(gb.board[0].hasShip).toBe(true)
        expect(gb.board[0].hasHit).toBe(true)
        expect(gb.ships[0].hits).toBe(1)

        gb.receiveAttack(["A", 2]);      
        expect(gb.ships[0].hits).toBe(2)
        expect(gb.ships[0].sunk).toBe(false)
        gb.receiveAttack(["A", 3]);
        expect(gb.ships[0].hits).toBe(3)    
        gb.receiveAttack(["A", 4]);       
        expect(gb.ships[0].hits).toBe(4)
        gb.receiveAttack(["A", 5]);       
        expect(gb.ships[0].hits).toBe(5)
        expect(gb.ships[0].sunk).toBe(true)
        gb.receiveAttack(["B", 1]);       
        expect(gb.ships[1].hits).toBe(0)
        expect(gb.ships[1].sunk).toBe(false)

    })

    it("checks if all ships are sunk", ()=>{
        gb.placeShip(gb.ships[0], ["A", 1], "horizontal")
        gb.placeShip(gb.ships[1], ["B", 1], "horizontal")
        gb.placeShip(gb.ships[2], ["C", 1], "horizontal")
        gb.placeShip(gb.ships[3], ["D", 1], "horizontal")
        gb.placeShip(gb.ships[4], ["E", 1], "horizontal")

        gb.receiveAttack(["A", 1]);
        gb.receiveAttack(["A", 2]);
        gb.receiveAttack(["A", 3]);
        gb.receiveAttack(["A", 4]);
        gb.receiveAttack(["A", 5]);

        gb.receiveAttack(["B", 1]);
        gb.receiveAttack(["B", 2]);
        gb.receiveAttack(["B", 3]);
        gb.receiveAttack(["B", 4]);

        gb.receiveAttack(["C", 1]);
        gb.receiveAttack(["C", 2]);
        gb.receiveAttack(["C", 3]);

        gb.receiveAttack(["D", 1]);
        gb.receiveAttack(["D", 2]);
        gb.receiveAttack(["D", 3]);

        gb.receiveAttack(["E", 1]);
        gb.receiveAttack(["E", 2]);
     
        expect(gb.allShipSunk()).toBe(true)
    })


})