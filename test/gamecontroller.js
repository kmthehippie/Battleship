
// import { player, computer } from "./player"

export const controller = {
    //Who is the current player? Always starts with Human
    whichPlayer: ["player", "computer"],
    activePlayer: "player",
    //Switch Player function
    switchPlayer: ()=>{
        controller.activePlayer = controller.activePlayer === controller.whichPlayer[0] ? controller.whichPlayer[1] : controller.whichPlayer[0];
    }
}



// module.exports = gamecontroller