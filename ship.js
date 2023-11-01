function createShip (pos, a, l){
    
    let position = pos;
    let axis = a;
    let length = l;
    let isHit = 0;
    let hit = function(){
        this.isHit++
        this.isSunk()
        return this.isHit
    };
    let isSunk = function(){
        if (this.isHit === this.length){
            console.log("SUNK SUNK SUNK")
            return true
        } else {
            return false
        }
    }

    return{ position, axis, length, isHit, hit, isSunk}
}


let carrier = createShip([2,3], "x", 5)




module.exports = { createShip, carrier }