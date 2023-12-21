// const Players = require("./player.js")

import { player, computer} from "./player"

describe("Player", ()=>{
    
    it("create player and computer. they spawn boards.they place ships.", ()=>{
        //ships are placed manually for now. when there is UI, we allow input from UI.

        let p = player      
        let board = p.playerBoard
        let ships = p.playerBoard.ships
        p.playerPlaceShips(ships[0], ["A", 1], "horizontal")

        expect(board.board.length).toBe(100)
        expect(board.board[0].hasShip).toBe(true)

        let c = computer
        let AIboard = c.computerBoard
        let AIships = c.computerBoard.ships
        c.computerPlaceShips(AIships[0], ["J", 1], "horizontal")

        expect(AIboard.board.length).toBe(100)
        expect(AIboard.board[0].hasShip).toBe(false)
        expect(AIboard.board[9].hasShip).toBe(true)


    })

    let p;
    let board;
    let ships;
    let c;
    let AIboard;
    let AIships;
    beforeEach(()=>{
        p = player      
        board = p.playerBoard
        ships = p.playerBoard.ships
        p.playerPlaceShips(ships[0], ["A", 1], "horizontal")

        c = computer
        AIboard = c.computerBoard
        AIships = c.computerBoard.ships
        c.computerPlaceShips(AIships[0], ["J", 1], "horizontal")


    })
        
    it("players can attack", ()=>{

        // Attacking is done manually. Go to game controller to attack automatically & change turns.

        p.playerAttacks(["I",1])
        p.playerAttacks(["J",1])
        expect(AIboard.board[8].hasHit).toBe(true)
        expect(AIboard.board[9].hasHit).toBe(true)

        c.computerAttacks()
        c.computerAttacks()
        c.computerAttacks()
        c.computerAttacks()
        c.computerAttacks()
        console.log(board)
      
    })

    it("computer must make random plays. should know if a move is legal or not", ()=>{
        c.computerAttacks(["A",1])
        expect(c.randomInput()).not.toBe(0)
    })
})