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

    this.pacmanTimer = null
    this.ghost1MoveTimer = null
    this.ghost1CycleTimer = null
    this.ghost2MoveTimer = null
    this.ghost2CycleTimer = null
    this.ghost3MoveTimer = null
    this.ghost3CycleTimer = null
    this.ghost4MoveTimer = null
    this.ghost4CycleTimer = null

    this.livesLeft = 3
    this.score = 0
    this.fatalCollision = false
    this.ghosts = []

    this.pacmansPos = []
    this.allGhostsPos = []

    // declare cells, rows, walls(array of objects/2d arrays)
    this.cells = []
    this.walls = []

    // Declare arrays that store lists of ordered pairs (x and y positions) representing the positions of portals, smallFood, bigFood
    this.portals = [
      [0, 14],
      [27, 14]
    ]

    // this.smallFood
    // this.bigFood

  }

  initDOM() {
    // Edit corresponding DOM elements and arrays/nodelists of DOM elements for cells, walls, smallFood, bigFood, pacman, ghosts. 
    // deprecated
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
      domPacman.style.left = `${data.cellWidth * pacman.xPos}px`
      domPacman.style.top = `${data.cellHeight * pacman.yPos}px`
    }, 125)
  }
}

class Ghost {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    // this.mode = null
  }

  // functions: startMoving(), startCycling()
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
    // is a constructor necessary?
  }

  // definition of releaseGhosts() and the calls it makes to each ghost object
}

// Instantiate data object
// Instantiate pacman object
// Instantiate 4 ghost objects
// Instantiate ghost manager object
// Add each ghost to the data.ghosts array

let data = new Data()
let pacman = new Pacman(data.pacmanStartX, data.pacmanStartY)
let ghostManager = new GhostManager()
let ghost1 = new Ghost(data.ghost1StartX, data.ghostStartY)
let ghost2 = new Ghost(data.ghost2StartX, data.ghostStartY)
let ghost3 = new Ghost(data.ghost3StartX, data.ghostStartY)
let ghost4 = new Ghost(data.ghost4StartX, data.ghostStartY)
pushGhosts(ghost1, ghost2, ghost3, ghost4)
// call initDOM()?

// initialise DOM elements here. DOM elements represent data stuctures stored in memory. Edit them in data.initDOM()
// if they're variables/consts, they can be declared in-function and accessed with window rather than declaring them here

// declaring the grid
const grid = document.querySelector('.grid-container')
grid.style.height = `${data.height * data.cellHeight}px`
grid.style.width = `${data.width * data.cellWidth}px`

// declaring and populating cells[], adding DOMcells to the DOM
for (let y = 0; y < data.height; y++) {
  const row = []
  for (let x = 0; x < data.width; x++) {
    const cell = new Cell(x, y)
    row.push(cell)

    // create a new element in the DOM for that cell
    const domCell = document.createElement('div')
    domCell.classList.add('grid-item')
    domCell.style.left = `${data.cellWidth * cell.xPos}px`
    domCell.style.top = `${data.cellHeight * cell.yPos}px`
    domCell.style.height = `${data.cellHeight}px`
    domCell.style.width = `${data.cellWidth}px`

    // give the domCell an attribute of x and y here
    domCell.setAttribute('x', `${cell.xPos}`)
    domCell.setAttribute('y', `${cell.yPos}`)

    grid.appendChild(domCell)
  }
  data.cells.push(row)
}

// populates walls array (extend this later, make space for portals)
data.cells.forEach(row => {
  row.forEach(cell => {
    if (cell.xPos === 0 || cell.yPos === 0 || cell.xPos === (data.width - 1) || cell.yPos === (data.height - 1)) {
      cell.isWall = true
      data.walls.push(cell)
    }
  })
})

// create a node list of all domCells
const domCellsNodeList = document.querySelectorAll('.grid-item')
// convert it to an array
const domCellsArray = Array.from(domCellsNodeList)
// filter the array for wall cells and give each of them a class of wall
const domWallsArray = domCellsArray.filter(domCell => {
  if (domCell.getAttribute('x') === '0' || domCell.getAttribute('y') === '0' || domCell.getAttribute('x') === `${(data.width - 1)}` || domCell.getAttribute('y') === `${(data.height - 1)}`) {
    domCell.classList.add('wall')

    return domCell
  }
})

// create pacman's DOM element
const domPacman = document.createElement('div')
domPacman.classList.add('pacman')
domPacman.style.left = `${data.cellWidth * data.pacmanStartX}px`
domPacman.style.top = `${data.cellHeight * data.pacmanStartY}px`
domPacman.style.height = `${data.cellHeight}px`
domPacman.style.width = `${data.cellWidth}px`

grid.appendChild(domPacman)



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

  while (!data.fatalCollision) {
    // check left portal
    if (data.portalPosition[0] === data.pacmansPos) {
      pacman.xPos = data.portalPosition[1][0]
      pacman.yPos = data.portalPosition[1][1]
    }

    // check right portal
    if (data.portalPosition[1] === data.pacmansPos) {
      pacman.xPos = data.portalPosition[0][0]
      pacman.yPos = data.portalPosition[0][1]
    }

    // check if pacman's position matches a position in the smallFood position array. If it does, remove that pair from the smallFood array, change that DOM cell by removing its smallFood class and increment data.score by a const smallScore
    // check if pacman's position matches a position in the bigFood position array. If it does, remove that element of the array, increment data.score by another predefined constant, call the ghosthandler which changes each ghostmode to frightened until either: a timeout expires (in which case the normal mode cycle interval is re-engaged) or there is a match between pacman and the ghosts position, in which case their 'back to base' mode is activated, where they wait for a timeout before returning to the normal mode/cycle interval.
    // if pacman's position matches that of a ghost and their mode is anything except frightened or 'back to base', fatalCollision is set to true
  }

  handleFatalCollision()
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
  // TODO 
  // make a call to a function from the pacman object that starts the movement interval, use timer ids to give it a timer
  pacman.startMoving()

  // make a call to the ghostManager which starts to release each ghost (at intervals)
  // ghostManager.releaseGhosts()
}



main()