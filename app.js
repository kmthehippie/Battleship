import { player, computer, checkPlacementValid, checkForCollision } from "./test/player.js"

let playerBoard = player.playerBoard.board;

let playerShips = player.playerBoard.ships

let computerBoard = computer.computerBoard.board;
const mainApp = {
    currentCellClicked: [0],
    playerOrientation: "horizontal",
    render: ()=>{
        //Populate 2 boards -- 1 for player, 1 for computer.
        const startBtn = document.querySelector(".start-btn")
        startBtn.addEventListener("click", ()=>{        
        mainApp.populatePBoard()
        //populate ship options
        const shipOpts = document.querySelector(".ship-options")
        shipOpts.style.display = "flex";
        mainApp.playerPlaceShips()

        mainApp.renderOrientation()

         //populate computer + randomize ships positions and place them in the board. i want to move this as an event that happens after the player completes placing their ships.
         mainApp.populateCBoard()
         computer.computerPlaceShips()
         mainApp.renderComputerShips();
       
        // const shipBtn = document.querySelector(".place-ships-btn")
        // const orientationBtn = document.querySelector(".orientation")
        // shipBtn.classList.remove("inactive");
        // orientationBtn.classList.remove("inactive");
        startBtn.classList = "inactive"
        })
    },
    //here not done yet. need to click to place the ship
    playerPlaceShips: ()=>{
        //very frustrated and stuck on this part.
        //for now make it same as computer place ships
        //first check the ship chosen. then place the ship 
        const shipBtns = document.querySelectorAll(".ship-btn")
        shipBtns.forEach(shipBtn =>{
            shipBtn.addEventListener("click", ()=>{
                mainApp.placingShip(shipBtn)

                //cause the length of ship to be determined
                //find out what is the orientation
                //when mouseover cells, cause hover effect for itself and the cells +1 or x10 of it.
                
            })
        })
        //after click carrier, click on board. if click on board and  if mouse over positions checkplacementvalid is illegal, then x it. add .carrier to the cell it is hovering. then remove if not selected

        
    },
    placingShip:(shipBtn)=>{
        let shipName = shipBtn.classList[1]
        console.log(shipName)
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
    //if we learn how to refactor this, it would be great. currently emptied is a copy of hovered just with the words remove instead of add...
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
                    createCell.addEventListener("click", ()=>{
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
    
    cellClicked: (c)=>{
        mainApp.currentCellClicked.pop()
        mainApp.currentCellClicked.push(Number(c.id))
        console.log(mainApp.currentCellClicked, c.classList[2])
        let shipName = c.classList[2]
        let index = Number(c.id)
        let orient = mainApp.playerOrientation
        let length;
        console.log(index)

        playerShips.forEach(playerShip =>{
            if (playerShip.name === shipName){
                length = playerShip.length
            }
        })
        
        if (index < 99 && (checkPlacementValid("horizontal", length, player.playerBoard.board[index].position) === true) && (checkForCollision(orient,length, player.playerBoard.board, index) === true)){
            player.playerPlaceShips(orient, index, shipName)
            let shipBtns = document.querySelectorAll(".ship-btn")
            shipBtns.forEach(btn =>{
            btn.classList.remove("active")
            if (btn.classList[1] === shipName){
                btn.classList.add("inactive")
            }
        })
        }

        
    

        console.log(player.playerBoard.ships)
        
        // if placeships clicked, the cell clicked = placing the ship. need to populate on other js. if click twice = vertical or horizontal

        //if placeships has been done and game has started...then each click = has hit on coordinate. change the style to active (meaning has been hit) if there is boat, show boat. if no boat, then see through
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
                console.log(orientBtn.classList)
            } else {
                orientBtn.classList.remove("ver")
                orientBtn.classList.add("hor")
                orientBtn.textContent = "Horizontal"
                mainApp.playerOrientation = "horizontal"
                console.log(orientBtn.classList)
            }
           
        })
    },
    findIndex: (coords, _board)=>{
        for (let i = 0; i < _board.length; i ++){
            if(_board[i].position[0] === coords[0] && _board[i].position[1] === coords[1]){
            return i
            }
        }

    }
    
    
}



mainApp.render();