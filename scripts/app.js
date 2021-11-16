class Data {
  constructor() {
    this.height = 31
    this.width = 28
    this.cellHeight = 21
    this.cellWidth = 21
    this.pacmanStartX = 13
    this.pacmanStartY = 23
    this.ghost1StartX = 11
    this.ghost2StartX = 12
    this.ghost3StartX = 15
    this.ghost4StartX = 16
    this.ghostStartY = 14

    this.smallScore = 10
    this.bigScore = 50

    this.pacmanTimer = null
    // now deprecated:
    this.ghost1CycleTimer = null
    this.ghost1MoveTimer = null
    this.ghost2CycleTimer = null
    this.ghost2MoveTimer = null
    this.ghost3CycleTimer = null
    this.ghost3MoveTimer = null
    this.ghost4CycleTimer = null
    this.ghost4MoveTimer = null


    this.livesLeft = 3
    this.score = 0
    this.fatalCollision = false
    this.ghosts = []

    this.allGhostsPos = [] // still needed?

    // declaring cells - 2d array of 'cell' ojects in 'row' arrays
    this.cells = []
    // declaring walls - array of 'cell' objects - isWall property is true
    this.walls = []

    // Declare arrays that store positions of portals, smallFood, bigFood
    this.tunnelPositions = [ // not including portals or ghost house
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1], [21, 1], [22, 1], [23, 1], [24, 1], [25, 1], [26, 1], [1, 2], [6, 2], [12, 2], [15, 2], [21, 2], [26, 2], [1, 3], [6, 3], [12, 3], [15, 3], [21, 3], [26, 3], [1, 4], [6, 4], [12, 4], [15, 4], [21, 4], [26, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [1, 6], [6, 6], [9, 6], [18, 6], [21, 6], [26, 6], [1, 7], [6, 7], [9, 7], [18, 7], [21, 7], [26, 7], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [9, 8], [10, 8], [11, 8], [12, 8], [15, 8], [16, 8], [17, 8], [18, 8], [21, 8], [22, 8], [23, 8], [24, 8], [25, 8], [26, 8], [6, 9], [12, 9], [15, 9], [21, 9], [6, 10], [12, 10], [15, 10], [21, 10], [6, 11], [9, 11], [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11], [17, 11], [18, 11], [21, 11], [6, 12], [9, 12], [18, 12], [21, 12], [6, 13], [9, 13], [18, 13], [21, 13], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [26, 14], [6, 15], [9, 15], [18, 15], [21, 15], [6, 16], [9, 16], [18, 16], [21, 16], [6, 17], [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [21, 17], [6, 18], [9, 18], [18, 18], [21, 18], [6, 19], [9, 19], [18, 19], [21, 19], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20], [6, 20], [7, 20], [8, 20], [9, 20], [10, 20], [11, 20], [12, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [21, 20], [22, 20], [23, 20], [24, 20], [25, 20], [26, 20], [1, 21], [6, 21], [12, 21], [15, 21], [21, 21], [26, 21], [1, 22], [6, 22], [12, 22], [15, 22], [21, 22], [26, 22], [1, 23], [2, 23], [3, 23], [6, 23], [7, 23], [8, 23], [9, 23], [10, 23], [11, 23], [12, 23], [13, 23], [14, 23], [15, 23], [16, 23], [17, 23], [18, 23], [19, 23], [20, 23], [21, 23], [24, 23], [25, 23], [26, 23], [3, 24], [6, 24], [9, 24], [18, 24], [21, 24], [24, 24], [3, 25], [6, 25], [9, 25], [18, 25], [21, 25], [24, 25], [1, 26], [2, 26], [3, 26], [4, 26], [5, 26], [6, 26], [9, 26], [10, 26], [11, 26], [12, 26], [15, 26], [16, 26], [17, 26], [18, 26], [21, 26], [22, 26], [23, 26], [24, 26], [25, 26], [26, 26], [1, 27], [12, 27], [15, 27], [26, 27], [1, 28], [12, 28], [15, 28], [26, 28], [1, 29], [2, 29], [3, 29], [4, 29], [5, 29], [6, 29], [7, 29], [8, 29], [9, 29], [10, 29], [11, 29], [12, 29], [13, 29], [14, 29], [15, 29], [16, 29], [17, 29], [18, 29], [19, 29], [20, 29], [21, 29], [22, 29], [23, 29], [24, 29], [25, 29], [26, 29]
    ]

    this.smallFood = [
      [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1], [20, 1], [21, 1], [22, 1], [23, 1], [24, 1], [25, 1], [26, 1], [1, 2], [6, 2], [12, 2], [15, 2], [21, 2], [26, 2], [6, 3], [12, 3], [15, 3], [21, 3], [1, 4], [6, 4], [12, 4], [15, 4], [21, 4], [26, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [1, 6], [6, 6], [9, 6], [18, 6], [21, 6], [26, 6], [1, 7], [6, 7], [9, 7], [18, 7], [21, 7], [26, 7], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [9, 8], [10, 8], [11, 8], [12, 8], [15, 8], [16, 8], [17, 8], [18, 8], [21, 8], [22, 8], [23, 8], [24, 8], [25, 8], [26, 8], [6, 9], [21, 9], [6, 10], [21, 10], [6, 11], [21, 11], [6, 12], [21, 12], [6, 13], [21, 13], [6, 14], [21, 14], [6, 15], [21, 15], [6, 16], [21, 16], [6, 17], [21, 17], [6, 18], [21, 18], [6, 19], [21, 19], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20], [6, 20], [7, 20], [8, 20], [9, 20], [10, 20], [11, 20], [12, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [21, 20], [22, 20], [23, 20], [24, 20], [25, 20], [26, 20], [1, 21], [6, 21], [12, 21], [15, 21], [21, 21], [26, 21], [1, 22], [6, 22], [12, 22], [15, 22], [21, 22], [26, 22], [2, 23], [3, 23], [6, 23], [7, 23], [8, 23], [9, 23], [10, 23], [11, 23], [12, 23], [14, 23], [15, 23], [16, 23], [17, 23], [18, 23], [19, 23], [20, 23], [21, 23], [24, 23], [25, 23], [3, 24], [6, 24], [9, 24], [18, 24], [21, 24], [24, 24], [3, 25], [6, 25], [9, 25], [18, 25], [21, 25], [24, 25], [1, 26], [2, 26], [3, 26], [4, 26], [5, 26], [6, 26], [9, 26], [10, 26], [11, 26], [12, 26], [15, 26], [16, 26], [17, 26], [18, 26], [21, 26], [22, 26], [23, 26], [24, 26], [25, 26], [26, 26], [1, 27], [12, 27], [15, 27], [26, 27], [1, 28], [12, 28], [15, 28], [26, 28], [1, 29], [2, 29], [3, 29], [4, 29], [5, 29], [6, 29], [7, 29], [8, 29], [9, 29], [10, 29], [11, 29], [12, 29], [13, 29], [14, 29], [15, 29], [16, 29], [17, 29], [18, 29], [19, 29], [20, 29], [21, 29], [22, 29], [23, 29], [24, 29], [25, 29], [26, 29]
    ]

    this.bigFood = [
      [1, 3], [26, 3], [1, 23], [26, 23]
    ]

    this.ghostHouse = [
      [13, 12], [14, 12], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15], [16, 15]
    ]

    this.portals = [
      [0, 14],
      [27, 14]
    ]

    this.notWalls = this.tunnelPositions.concat(this.ghostHouse).concat(this.portals)

    // declaring the grid
    this.grid = document.querySelector('.grid-container')
    this.grid.style.height = `${this.height * this.cellHeight}px`
    this.grid.style.width = `${this.width * this.cellWidth}px`

    // declaring and populating cells[] (an array of objects), adding domCells to the DOM
    for (let y = 0; y < this.height; y++) {
      const row = []
      for (let x = 0; x < this.width; x++) {
        const cell = new Cell(x, y)
        row.push(cell)

        // TODO
        // if the cell has xPos and yPos in the position of a wall, set the cell.isWall property to true

        // create new DOM element for each cell
        const domCell = document.createElement('div')
        domCell.style.left = `${this.cellWidth * cell.xPos}px`
        domCell.style.top = `${this.cellHeight * cell.yPos}px`
        domCell.style.height = `${this.cellHeight}px`
        domCell.style.width = `${this.cellWidth}px`
        domCell.classList.add('grid-item')

        // define the cell's position as a string
        const cellPosition = JSON.stringify([cell.xPos, cell.yPos])
        const positionMatch = (element) => JSON.stringify(element) === cellPosition

        // if the cell is in a wall position, smallFood position or bigFood position, add that class
        if (!this.notWalls.some(positionMatch)) {
          domCell.classList.add('wall')
        }

        if (this.smallFood.some(positionMatch)) {
          domCell.classList.add('small-food')
        }

        if (this.bigFood.some(positionMatch)) {
          domCell.classList.add('big-food')
        }


        // set domCell x and y attributes
        domCell.setAttribute('x', `${cell.xPos}`)
        domCell.setAttribute('y', `${cell.yPos}`)

        this.grid.appendChild(domCell)
      }
      this.cells.push(row)
    }

    // create a node list of all domCells and convert it to an array
    this.domCellsNodeList = document.querySelectorAll('.grid-item')
    this.domCellsArray = Array.from(this.domCellsNodeList)

    // create pacman's DOM element, add it to the grid
    this.domPacman = document.createElement('div')
    this.domPacman.classList.add('pacman')
    this.domPacman.style.left = `${this.cellWidth * this.pacmanStartX}px`
    this.domPacman.style.top = `${this.cellHeight * this.pacmanStartY}px`
    this.domPacman.style.height = `${this.cellHeight}px`
    this.domPacman.style.width = `${this.cellWidth}px`
    this.grid.appendChild(this.domPacman)

    // populates walls (1d array of objects) - (make space for portals)
    // TODO remove this later
    this.cells.forEach(row => {
      row.forEach(cell => {
        this.notWalls.forEach(position => {
          if (cell.xPos !== position[0] && cell.yPos !== position[1]) {
            cell.isWall = true
            this.walls.push(cell)
          }
        })
      })
    })

  }

  initDOM() { // not needed
  }
}

class Pacman {
  constructor(x, y) {
    this.guide = null
    this.xPos = x
    this.yPos = y
    this.prevXPos = x
    this.prevYPos = y
  }

  startMoving() {
    data.pacmanTimer = setInterval(() => {
      let newX = pacman.xPos
      let newY = pacman.yPos

      // using the guide value to determine newX, newY (guideCell positions)
      switch (pacman.guide) {
        case 'left':
          newX -= 1
          break
        case 'right':
          newX += 1
          break
        case 'up':
          newY -= 1
          break
        case 'down':
          newY += 1
          break
        default:
          break
      }

      // using the guideCell's isWall property to decide if it's traversable
      const guideCell = data.cells[newY][newX]
      if (!guideCell.isWall) {
        pacman.prevXPos = pacman.xPos
        pacman.prevYPos = pacman.yPos

        pacman.xPos = newX
        pacman.yPos = newY
      } else {
        // deduce the travelCell from the prevXPos and prevYPos and the current xPos, yPos (linearly) and move to that cell if *it* is not a wall. This block prevents pacman stopping if he's guided into a wall when there's a free cell ahead
        let travelX = pacman.xPos
        let travelY = pacman.yPos

        if (pacman.prevXPos !== pacman.xPos) {
          travelX = pacman.xPos + (pacman.xPos - pacman.prevXPos)
        } else if (pacman.prevYPos !== pacman.yPos) {
          travelY = pacman.yPos + (pacman.yPos - pacman.prevYPos)
        }

        const travelCell = data.cells[travelY][travelX]

        if (!travelCell.isWall) {
          pacman.prevXPos = pacman.xPos
          pacman.prevYPos = pacman.yPos

          pacman.xPos = travelX
          pacman.yPos = travelY
        }
      }

      // move the pacman DOM element
      data.domPacman.style.left = `${data.cellWidth * pacman.xPos}px`
      data.domPacman.style.top = `${data.cellHeight * pacman.yPos}px`
    }, 125)
  }
}

class Ghost {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    this.cycleTimerId = null
    this.moveTimerId = null
    // this.mode = null
  }

  // functions: startMoving(), startCycling()
  startCycling() {
    // this.cycleTimerId = setInterval(() => {
    // each interval, change this.mode (use a switch statement to change from one mode to another)
    // }, constant goes here 5000?)
  }

  startMoving() {
    // this.moveTimerId = setInterval(() => {
    // Define a target cell based on what mode we're in. find a pathway to the target cell, then start traversing it.
    // }, constant goes here 200?)
  }
}

class Cell {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    this.isWall = false // or null?
  }
}

class GhostManager {
  constructor() {
    // is a constructor necessary? just use return?
  }

  // definition of releaseGhosts() and the calls it makes to each ghost object
  releaseGhosts() {
    // start all ghost mode cycling and movement with a pause inbetween each one
    ghost1.startCycling()
    ghost1.startMoving()

    setTimeout(() => {
      ghost2.startCycling()
      ghost2.startMoving()
    }, 3000)

    setTimeout(() => {
      ghost3.startCycling()
      ghost3.startMoving()
    }, 3000)

    setTimeout(() => {
      ghost4.startCycling()
      ghost4.startMoving()
    }, 3000)
  }
}

// Instantiate all objects
// Add each ghost to the data.ghosts array

let data = new Data()
let pacman = new Pacman(data.pacmanStartX, data.pacmanStartY)
let ghostManager = new GhostManager()
let ghost1 = new Ghost(data.ghost1StartX, data.ghostStartY)
let ghost2 = new Ghost(data.ghost2StartX, data.ghostStartY)
let ghost3 = new Ghost(data.ghost3StartX, data.ghostStartY)
let ghost4 = new Ghost(data.ghost4StartX, data.ghostStartY)
pushGhosts(ghost1, ghost2, ghost3, ghost4)


// ! MAIN

function main() {
  runGame()
  handleFatalCollision()
}


function runGame() {
  // halts execution until the user starts the game with a keypress
  while (pacman.guide !== 'left' || pacman.guide !== 'right') {
    return
  }

  beginPlay()

  // TODO removing temporarily
  // while (!data.fatalCollision) {
  //   // check left portal
  //   if (data.portalPosition[0] === data.pacmansPos) {
  //     pacman.xPos = data.portalPosition[1][0]
  //     pacman.yPos = data.portalPosition[1][1]
  //   }

  //   // check right portal
  //   if (data.portalPosition[1] === data.pacmansPos) {
  //     pacman.xPos = data.portalPosition[0][0]
  //     pacman.yPos = data.portalPosition[0][1]
  //   }

  //   // check if pacman's position matches a position in the smallFood position array. If it does, remove that pair from the smallFood array, change that DOM cell by removing its smallFood class and increment data.score by a const smallScore

  //   // if pacman eats smallFood, remove that element from smallFood positional array, increase score
  //   data.smallFood.forEach(position => {
  //     if (position[0] === pacman.xPos && position[1] === pacman.yPos) {
  //       const index = data.smallFood.indexOf(position)
  //       data.smallFood.splice(index, 1)

  //       data.score += data.smallScore
  //     }
  //   })

  //   // if pacman steps on smallfood, remove that class from the dom cell
  //   data.domCellsArray.forEach(domCell => {
  //     if (domCell.getAttribute('x') === pacman.xPos && domCell.getAttribute('y') === pacman.yPos) {
  //       domCell.classList.remove('small-food')
  //     }
  //   })

  //   // check if pacman's position matches a position in the bigFood position array. If it does, remove that element of the array, increment data.score by another predefined constant, call the ghosthandler which changes each ghostmode to frightened until either: a timeout expires (in which case the normal mode cycle interval is re-engaged) or there is a match between pacman and the ghosts position, in which case their 'back to base' mode is activated, where they wait for a timeout before returning to the normal mode/cycle interval.
  //   // if pacman's position matches that of a ghost and their mode is anything except frightened or 'back to base', fatalCollision is set to true
  // }

  // handleFatalCollision()
}

function handleFatalCollision() {
  data.livesLeft -= 1
  // clear movement intervals for all entities.
  // if livesLeft < 1, (disable keyboard input?), call a function which displays the game over screen
  if (data.livesLeft < 1) {
    // call gameOver()
  } else if (data.livesLeft > 0) { // if there are lives left, reset positions and restart game
    pacman.xPos = data.pacmanStartX
    pacman.yPos = data.pacmanStartY

    ghost1.xPos = data.ghost1StartX
    ghost1.yPos = data.ghostStartY
    ghost2.xPos = data.ghost2StartX
    ghost2.yPos = data.ghostStartY
    ghost3.xPos = data.ghost3StartX
    ghost3.yPos = data.ghostStartY
    ghost4.xPos = data.ghost4StartX
    ghost4.yPos = data.ghostStartY

    runGame()
  }
}

// helper functions
function pushGhosts(ghost1, ghost2, ghost3, ghost4) {
  data.ghosts.push(ghost1)
  data.ghosts.push(ghost2)
  data.ghosts.push(ghost3)
  data.ghosts.push(ghost4)
}

// handle key press
function handleKeyDown(e) {
  switch (e.code) {
    case 'ArrowLeft':
      pacman.guide = 'left'
      break
    case 'ArrowUp':
      pacman.guide = 'up'
      break
    case 'ArrowRight':
      pacman.guide = 'right'
      break
    case 'ArrowDown':
      pacman.guide = 'down'
      break
    default:
      break
  }
}

// keydown event listener
document.addEventListener('keydown', handleKeyDown)

function beginPlay() {
  // make a call to a function from the pacman object that starts the movement interval, use timer ids to give it a timer
  pacman.startMoving()

  // make a call to the ghostManager which starts to release each ghost (at intervals)
  // TODO (removing temporarily)
  // ghostManager.releaseGhosts()
}


// begin program execution
main()