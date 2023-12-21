// const controller = require("./gamecontroller.js")

import {controller } from "./gamecontroller"
describe("Controls the game", ()=>{
    it("Spawns 2 boards. 1 for human player. 1 for ai", ()=>{
        controller()
        expect(controller().human.playerBoard.board.length).toBe(100)
    })
    it("switches between players",()=>{
        expect(controller.activePlayer).toBe(controller.human)
        controller().switchPlayer()
        expect(controller.activePlayer).toBe(controller.computer)
    })



})