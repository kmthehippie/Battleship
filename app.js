
const mainApp = {
    render: ()=>{
        const startBtn = document.querySelector(".start-btn")
        startBtn.addEventListener("click", ()=>{
        const playerDiv = document.querySelector(".playerBoard")
        const computerDiv = document.querySelector(".computerBoard")
        let width = 10;
        let index = 0;
        
        //Populate 2 boards -- 1 for player, 1 for computer.
        const populateBoard = function(whichDiv){
            if (whichDiv == playerDiv){
                const playerName = document.querySelector(".player-name")
                playerName.textContent = "PLAYER"
            } else {
                const computerName = document.querySelector(".computer-name")
                computerName.textContent = "COMPUTER"
            }
            
            for (let r= 0; r < width; r++){
                for (let c = 0; c < width; c++){
                    const createCell = document.createElement("div");
                    createCell.classList = `${index} cell`
                    createCell.id = index++
                    whichDiv.appendChild(createCell)
                    createCell.addEventListener("click", ()=>{
                        mainApp.cellClicked(createCell)
                    })
                }
            }
        }
        const shipBtn = document.querySelector(".place-ships-btn")
        const orientationBtn = document.querySelector(".orientation")
        shipBtn.classList.remove("inactive");
        orientationBtn.classList.remove("inactive");
        populateBoard(playerDiv)
        populateBoard(computerDiv)
        startBtn.classList = "inactive"
        })

    },
    
    cellClicked: (c)=>{
        console.log(`${c.classList}`)
    }
    
}

mainApp.render();