
export class Ship {
    constructor(name, length){
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.position = [];
    }

    isHit(){
        this.hits ++;
        if (this.hits >= this.length) {
            this.hits = this.length;
            this.isSunk();
        }
    }

    isSunk(){
        this.sunk = true;
    }
}

// module.exports = Ship