
const { gameboard, firstBoard } = require('./gameboard.js')

it ("Testing gameboard spawn", ()=>{
    expect(gameboard("Player Two")).toEqual(
        expect.objectContaining({
            playerName: "Player Two",
            board: expect.any(Array),
            spawnBoard: expect.any(Function)
        })
    )
})

it("Test firstBoard spawn", ()=>{
    expect(firstBoard).toEqual({
        playerName: "Player One",
        board: expect.any(Array),
        spawnBoard: expect.any(Function)
    })
})