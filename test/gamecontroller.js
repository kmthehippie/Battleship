
import { player, computer } from "./player"

export const controller = function(){



    //Start Game by creating player and computer boards
    let human = player;
    let ai = computer;



    //Who is the current player? Always starts with Human
    let whichPlayer = [human, ai]
    let activePlayer = whichPlayer[0];

    //Switch Player function
    const switchPlayer = () => {
        activePlayer = activePlayer === whichPlayer[0] ? whichPlayer[1] : whichPlayer[0];
    }

    //If it is AI turn, computer makes attack
    return {
        human, ai,
        activePlayer,
        switchPlayer
    }

    

}



// module.exports = gamecontroller