// const Ship = require("./ship.js")
import {Ship} from "./ship"
describe('Ships',()=>{

    let ship;
    beforeEach(()=>{
        ship = new Ship("name", 5);
    })

    it("ship has length, hits, sunk", () =>{
        expect(ship.length).toBe(5);
        expect(ship.hits).toBe(0);
        expect(ship.sunk).toBe(false)
    });

    it("ship is hit fn", ()=>{
        ship.isHit();
        expect(ship.hits).toBe(1);
        ship.isHit();
        expect(ship.hits).toBe(2);
        ship.isHit();
        expect(ship.hits).toBe(3);
        ship.isHit();
        expect(ship.hits).toBe(4);
        ship.isHit();
        expect(ship.hits).toBe(5);
        ship.isHit();
        expect(ship.hits).toBe(5);
    })

    it("ship is sunk fn", ()=>{
        expect(ship.sunk).toBe(false);
        ship.isHit();
        ship.isHit();
        ship.isHit();
        ship.isHit();
        ship.isHit();
        expect(ship.sunk).toBe(true);
    })

})