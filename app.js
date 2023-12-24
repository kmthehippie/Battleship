import { player, computer, checkPlacementValid, checkForCollision } from "./test/player.js"
import { controller } from "./test/gamecontroller.js"

let playerBoard = player.playerBoard.board;

let playerShips = player.playerBoard.ships

let computerBoard = computer.computerBoard.board;
export const mainApp = {
    currentCellClicked: [0],
    playerOrientation: "horizontal",
    render: ()=>{
        //Populate 2 boards -- 1 for player, 1 for computer.
        const startBtn = document.querySelector(".start-btn")
        startBtn.addEventListener("click", ()=>{     
            startBtn.classList = "inactive"   
            
            mainApp.populatePBoard()
            //populate ship options
            const shipOpts = document.querySelector(".ship-options")
            shipOpts.style.display = "flex";
            mainApp.playerPlaceShips()
            mainApp.renderOrientation()            
            mainApp.initializeGame()
        })
    },
    playerPlaceShips: ()=>{
        const shipBtns = document.querySelectorAll(".ship-btn")
        shipBtns.forEach(shipBtn =>{
            shipBtn.addEventListener("click", ()=>{
                mainApp.placingShip(shipBtn)
            })
        })

        
    },
    placingShip:(shipBtn)=>{
        let shipName = shipBtn.classList[1]
        let playerCells = document.querySelectorAll(".cell")
        playerShips.forEach(playerShip =>{          
            if (playerShip.name === shipName){   
                shipBtn.classList.add("active")
                playerCells.forEach(cell =>{
                    cell.removeEventListener("mouseenter", mainApp.cellHovered, true)
                })
                playerCells.forEach(cell =>{
                    cell.removeEventListener("mouseleave", mainApp.cellEmptied, true)
                })
               
                playerCells.forEach(cell =>{
                    cell.addEventListener("mouseenter", mainApp.cellHovered, true)
                })

                playerCells.forEach(cell =>{
                    cell.addEventListener("mouseleave", mainApp.cellEmptied, true)
                })
               
                
            }
        })
    },
    cellHovered: (c)=>{
        let index = Number(c.srcElement.id)
        let orient = mainApp.playerOrientation
        let ship;
        let length
        let cells = document.querySelectorAll(".cell")
        let shipBtns = document.querySelectorAll(".ship-btn")
        shipBtns.forEach(shipBtn =>{
            if(shipBtn.classList[2] === "active"){ 
                ship = shipBtn.classList[1]
            }
        })
        playerShips.forEach(playerShip =>{
            if (playerShip.name === ship){
                length = playerShip.length
            }
        })

        if (orient === "horizontal"){
            if (index < 99 && checkPlacementValid("horizontal", length, player.playerBoard.board[index].position) === true && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
                for(let i = 0; i < length; i ++){
                    cells[index+(i)].classList.add(ship)
                }
            } 
        } else {
            if (index < 99 && checkPlacementValid("vertical", length, player.playerBoard.board[index].position) === true && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
                for(let i = 0; i < length; i ++){
                    cells[index+(i*10)].classList.add(ship)
                }
            }  
        }

        
    },
    //pls refactor cellEmptied, cellClicked, cellHovered
    cellEmptied:(c)=>{
        let index = Number(c.srcElement.id)
        let orient = mainApp.playerOrientation
        let ship;
        let length
        let cells = document.querySelectorAll(".cell")
        let shipBtns = document.querySelectorAll(".ship-btn")
        shipBtns.forEach(shipBtn =>{
            if(shipBtn.classList[2] === "active"){ 
                ship = shipBtn.classList[1]
            }
        })
        playerShips.forEach(playerShip =>{
            if (playerShip.name === ship){
                length = playerShip.length
            }
        })
        if (orient === "horizontal"){
            if (index < 99 && checkPlacementValid("horizontal", length, player.playerBoard.board[index].position) === true && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
                for(let i = 0; i < length; i ++){
                    cells[index+(i)].classList.remove(ship)
                }
            }  
        } else {
            if (index < 99 && checkPlacementValid("vertical", length, player.playerBoard.board[index].position) === true && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
                for(let i = 0; i < length; i ++){
                    cells[index+(i*10)].classList.remove(ship)
                }
            }  
        }
    },
    cellClicked: (c)=>{
        
        mainApp.currentCellClicked.pop()
        mainApp.currentCellClicked.push(Number(c.id))
        let shipName = c.classList[2]
        let index = Number(c.id)
        let orient = mainApp.playerOrientation
        let length;
        
        //which board is being hit
        let className = c.classList[0]
        let splitArray = className.split("-")
        let whichBoard = splitArray[0]
        //here i am placing ships
        playerShips.forEach(playerShip =>{
            if (playerShip.name === shipName){
                length = playerShip.length
            }
        })

        
        
        if (whichBoard === "player"){
            if (index < 99 && (checkPlacementValid(orient, length, player.playerBoard.board[index].position) === true) && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
                player.playerPlaceShips(orient, index, shipName)
                let shipBtns = document.querySelectorAll(".ship-btn")
                shipBtns.forEach(btn =>{
                btn.classList.remove("active")
                if (btn.classList[1] === shipName){
                    btn.classList.add("inactive")
                }
            })
            }
        } else {
            
           if (controller.activePlayer === "player"){
                if (computer.computerBoard.board[index].hasHit === true){
                    console.log("ERROR, please click again")
                    return
                } else {
                    mainApp.attackClick(index, c)
                    if (computer.computerBoard.allShipSunk() === true) {
                        mainApp.renderWinner("player")
                        console.log("YOU are the winner")
                    } else {
                        controller.switchPlayer()    
                        if(player.playerBoard.allShipSunk()=== true){
                            mainApp.renderWinner("computer")
                            console.log("Computer won")
                        } else {
                            mainApp.computerAttack(c)
                            controller.switchPlayer()
                        }
                    }
                }       
           } 

    
            }

     
    },
    populatePBoard: ()=>{
        let width = 10;
        let index = 0;
        //create divs
        const playerName = document.querySelector(".player-name")
        playerName.textContent = "PLAYER"
        const playerBoard = document.querySelector(".playerBoard")
            for (let r= 0; r < width; r++){
                for (let c = 0; c < width; c++){
                    const createCell = document.createElement("div");
                    createCell.classList = `player-${index} cell`
                    createCell.id = index++
                    playerBoard.appendChild(createCell)
                    createCell.addEventListener("click", (e)=>{
                        mainApp.cellClicked(createCell)
                    })
                    // createCell.addEventListener("mouseover", ()=>{
                    //     mainApp.cellHovered(createCell)
                    // })
                }
            }   
    },
    populateCBoard: ()=>{
        let width = 10;
        let index = 0;
        const parent = document.querySelector(".boards")
        const createCBoard = document.createElement("div")
        createCBoard.classList = "cBoard"
        const computerName = document.createElement("div")
        computerName.classList = "computer-name name"
        computerName.textContent = "COMPUTER"
        const computerBoard = document.createElement("div")
        computerBoard.classList = "computerBoard"
      
        parent.appendChild(createCBoard)
        createCBoard.appendChild(computerName)
        createCBoard.appendChild(computerBoard)
        for (let r= 0; r < width; r++){
            for (let c = 0; c < width; c++){
                const createCell = document.createElement("div");
                createCell.classList = `computer-${index} cell`
                createCell.id = index++
                computerBoard.appendChild(createCell)
                createCell.addEventListener("click", ()=>{
                    mainApp.cellClicked(createCell)
                })
            }
        }
    },
    renderComputerShips: ()=>{
        let ships = computer.computerBoard.ships;
        //here i want to make the ship visually visible on the board
        ships.forEach(ship => {
            let coords = ship.position
            for (let i = 0; i < coords.length; i ++){
                let index = mainApp.findIndex(coords[i], computerBoard)
                const divWithShip = document.querySelector(`.computer-${index}`)
                divWithShip.classList.add(ship.name)
            }         
        })
    },
    createPlayers: ()=>{
        //create players and their gameboard
        player();
        computer();
    },
    //horizontal or vertical?
    renderOrientation: ()=>{
        let orientBtn = document.querySelector(".orientation")
        orientBtn.addEventListener("click", ()=>{ 
            if (orientBtn.classList[1] === "hor"){
                orientBtn.classList.remove("hor")
                orientBtn.classList.add("ver")
                orientBtn.textContent = "Vertical"
                mainApp.playerOrientation = "vertical"
            } else {
                orientBtn.classList.remove("ver")
                orientBtn.classList.add("hor")
                orientBtn.textContent = "Horizontal"
                mainApp.playerOrientation = "horizontal"
            }
           
        })
    },
    initializeGame: ()=>{
        let confirmBtn = document.querySelector(".confirm")
        let orientBtn = document.querySelector(".orientation")
        let text = document.querySelector(".text")
        confirmBtn.addEventListener("click", ()=>{
        orientBtn.classList.add("inactive")
        confirmBtn.classList.add("inactive")
        text.classList.add("inactive")
        //populate computer + randomize ships positions and place them in the board. i want to move this as an event that happens after the player completes placing their ships.
         mainApp.populateCBoard()
         computer.computerPlaceShips()
         

        })
    },
    attackClick: (cell, c)=>{
        let curCellOnBoard = computer.computerBoard.board[cell]
        computer.computerBoard.receiveAttack(cell)
        curCellOnBoard.hasHit = true
        c.classList.add("isHit")
        let ships = computer.computerBoard.ships
        //convert cell index to coordinate
        ships.forEach(ship =>{
            let positions = ship.position
            for (let i = 0; i < positions.length; i ++){
                if (ship.position[i] === curCellOnBoard.position){
                    ship.isHit()
                    c.classList.add(ship.name)
                    c.textContent = "X"
                    c.classList.remove("isHit")
                }
            }
        })      
      

        
    },
    computerAttack: () =>{
        let index = computer.computerAttacks()
        console.log(index)
        //place the attack on both the ui and on the playerBoard
        computer.computerHits(index)

        let board = player.playerBoard.board
        let curCellOnBoard = board[index]
        let playerUI = document.querySelectorAll(".cell")
        let ships = player.playerBoard.ships
    
        //DOM manipulation of ships effects + ship function
        ships.forEach(ship =>{
            let positions = ship.position
            for (let i = 0; i < positions.length; i ++){
                if (ship.position[i] === curCellOnBoard.position){
                    ship.isHit()
                    playerUI[index].textContent = "X"
                    playerUI[index].classList.remove("isHit")
                }
            }
        }) 



    },


    findIndex: (coords, _board)=>{
        for (let i = 0; i < _board.length; i ++){
            if(_board[i].position[0] === coords[0] && _board[i].position[1] === coords[1]){
            return i
            }
        }

    },
    renderWinner: (winner)=>{
        let winnerDiv = document.querySelector(".winnerDiv")
        if (winner === "player") {
            winnerDiv.classList.remove("inactive")
            let createHeader = document.createElement("h1")
            createHeader.textContent = "CONGRATULATIONS"
            createHeader.classList = "header"
            let createDiv = document.createElement("div")
            createDiv.textContent = "You Are The Winner!"
            let createDiv2 = document.createElement("div")
            createDiv2.textContent = "Would you like to play again?"
            let createButton = document.createElement("button")
            createButton.textContent = "PLAY AGAIN"
            winnerDiv.appendChild(createHeader)
            winnerDiv.appendChild(createDiv)
            winnerDiv.appendChild(createDiv2)
            winnerDiv.appendChild(createButton)
            createButton.addEventListener("click", ()=>{
                location.reload()
            })
        }else {
            winnerDiv.classList.remove("inactive")
            let createHeader = document.createElement("h1")
            createHeader.textContent = "AWWW...."
            createHeader.classList = "header"
            let createDiv = document.createElement("div")
            createDiv.textContent = "The Computer Won!"
            let createDiv2 = document.createElement("div")
            createDiv2.textContent = "Would you like to play again?"
            let createButton = document.createElement("button")
            createButton.textContent = "PLAY AGAIN"
            winnerDiv.appendChild(createHeader)
            winnerDiv.appendChild(createDiv)
            winnerDiv.appendChild(createDiv2)
            winnerDiv.appendChild(createButton)
            createButton.addEventListener("click", ()=>{
                location.reload()
            })
        }
    }
    
    
}



mainApp.render();