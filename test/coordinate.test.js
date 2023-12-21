// const Coordinate = require("./coordinate.js")
 
import {Coordinate} from "./coordinate"

describe ('Coordinate', ()=>{
it("spawn one coordinate", ()=>{
    let newC = new Coordinate(1,1)
    expect(newC.position).toEqual([1,1])
    expect(newC.hasShip).toEqual(false)
})
})