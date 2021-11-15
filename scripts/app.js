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

    this.livesLeft = 3
    this.score = 0
    this.fatalCollision = false
    this.ghosts = []
    // declare cells, rows, walls(array of objects/2d arrays)

    // Declare arrays that store lists of ordered pairs (x and y positions) representing the positions of portals, smallFood, bigFood, pacman and ghosts
  }

  initDOM() {
    // Declare corresponding DOM elements and arrays/nodelists of DOM elements for cells, walls, smallFood, bigFood, pacman, ghosts. 
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
}

class Ghost {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    // this.mode = null
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
// call initDOM()

// initialise DOM elements here. DOM elements represent data stuctures stored in memory
// if they're variables/consts, they can be declared in-function and accessed with window rather than declaring them here

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
    // check if pacman's position matches a portal position, respond to it
    // TODO
    // check if pacman's position matches a position in the smallFood position array. If it does, remove that pair from the smallFood array, change that DOM cell by removing its smallFood class and increment data.score by a const smallScore
    // check if pacman's position matches a position in the bigFood position array. If it does, remove that element of the array, increment data.score by another predefined constant, call the ghosthandler which changes each ghostmode to frightened until either: a timeout expires (in which case the normal mode cycle interval is re-engaged) or there is a match between pacman and the ghosts position, in which case their 'back to base' mode is activated, where they wait for a timeout before returning to the normal mode/cycle interval.
    // if pacman's position matches that of a ghost and their mode is anything except frightened or 'back to base', fatalCollision is set to true
  }

  handleFatalCollision()
}

function handleFatalCollision() {
  // livesLeft is decremented by 1
  // clear movement intervals for all entities.
  // if livesLeft < 1, (disable keyboard input?), call a function which displays the game over screen
  // else if livesLeft > 0, reset the positions. call runGame()
}

// helper functions
function pushGhosts(ghost1, ghost2, ghost3, ghost4) {
  data.ghosts.push(ghost1)
  data.ghosts.push(ghost2)
  data.ghosts.push(ghost3)
  data.ghosts.push(ghost4)
  console.log(data.ghosts) // temp
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

function beginPlay() {
  // make a call to a function from the pacman object that starts the movement interval
  // make a call to the ghostManager which starts to release each ghost (at intervals)
  // ghostManager.releaseGhosts()
}



main()