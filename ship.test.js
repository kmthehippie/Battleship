const {createShip, carrier} = require('./ship')

it ("Testing Ship", ()=>{
    expect(createShip([2,3], "x", 5)).toEqual(
        expect.objectContaining(
        {
        position: [2,3],
        axis: 'x',
        length: 5,
        isHit: 0,
        hit: expect.any(Function),
        isSunk: expect.any(Function)
    })
    )
})