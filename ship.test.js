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

it ("Testing 1 Hit on carrier", ()=>{
    expect(carrier.hit()).toBe(
        isHit = 1, false
    )
})

it ("Testing 2 Hit on carrier", ()=>{
    expect(carrier.hit()).toBe(
        isHit = 2, false
    )
})
it ("Testing 3 Hit on carrier", ()=>{
    expect(carrier.hit()).toBe(
        isHit = 3, false
    )
})
it ("Testing 4 Hit on carrier", ()=>{
    expect(carrier.hit()).toBe(
        isHit = 4, false
    )
})
it ("Testing 5 Hit on carrier", ()=>{
    expect(carrier.hit()).toBe(
        isHit = 5, true
    )
})