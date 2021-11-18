import _, { sortBy } from 'underscore'

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
    this.captureScore = 200

    this.pacmanTimer = null
    this.monitorTimer = null
    // now deprecated:
    this.ghost1CycleTimer = null
    this.ghost1MoveTimer = null
    this.ghost2CycleTimer = null
    this.ghost2MoveTimer = null
    this.ghost3CycleTimer = null
    this.ghost3MoveTimer = null
    this.ghost4CycleTimer = null
    this.ghost4MoveTimer = null

    // ghost speed in ms - constant
    this.ghostMovementInterval = 200

    //prevent bounce
    // this.lastActivated = 0
    // this.delay = 20
    this.activated = false
    this.fatalActivated = false
    this.chompActivated = false
    this.pelletActivated = false


    this.started = false
    this.livesLeft = 3
    this.score = 0
    this.fatalCollision = false
    this.ghosts = []

    this.introAudio = document.querySelector('#intro-audio')

    this.allGhostsPos = [] // still needed?

    // setting DOM header styles
    this.domHeader = document.querySelector('header')
    this.domHeader.style.height = `${this.cellHeight * 2}px`
    this.domHeader.style.width = `${this.cellWidth * this.width}px`

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

        // define the cell's position as a string
        const cellPosition = JSON.stringify([cell.xPos, cell.yPos])
        // define function that checks if two (string) positions match
        const positionMatch = (element) => JSON.stringify(element) === cellPosition

        // if the cell has xPos and yPos in the position of a wall, set the cell.isWall property to true
        // cell.isWall = true
        // 

        if (!this.notWalls.some(positionMatch)) {
          cell.isWall = true // this could be refactored and put with the conditionals below
        }

        row.push(cell) // this could be moved to the bottom of the block


        // For the DOM:
        // create new DOM element for each cell
        const domCell = document.createElement('div')
        domCell.style.left = `${this.cellWidth * cell.xPos}px`
        domCell.style.top = `${this.cellHeight * cell.yPos}px`
        domCell.style.height = `${this.cellHeight}px`
        domCell.style.width = `${this.cellWidth}px`
        domCell.classList.add('grid-item')


        // if the cell is in a wall position, smallFood position or bigFood position, add that class
        if (!this.notWalls.some(positionMatch)) {
          domCell.classList.add('wall')
        }

        if (this.smallFood.some(positionMatch)) {
          domCell.classList.add('small-food') //TODO change this - edit: why??
          domCell.style.backgroundImage = 'url(https://i.imgur.com/flcwtAM.png)'
        }

        if (this.bigFood.some(positionMatch)) {
          domCell.classList.add('big-food')
        }


        // set domCell x and y attributes
        domCell.setAttribute('x', `${cell.xPos}`)
        domCell.setAttribute('y', `${cell.yPos}`)

        // set an id value here, to be accessed during the monitor loop
        domCell.id = `${cell.xPos}, ${cell.yPos}`

        this.grid.appendChild(domCell)
      }
      this.cells.push(row)
    }

    // const testBackground = document.createElement('div')
    // testBackground.classList.add('game-over-cover')
    // const background = document.querySelector('.background')
    // background.appendChild(testBackground)

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

    // create ghost 1's DOM element, add it to grid
    this.domGhost1 = document.createElement('div')
    this.domGhost1.classList.add('ghost1')
    this.domGhost1.style.left = `${this.cellWidth * this.ghost1StartX}px`
    this.domGhost1.style.top = `${this.cellHeight * this.ghostStartY}px`
    this.domGhost1.style.height = `${this.cellHeight}px`
    this.domGhost1.style.width = `${this.cellWidth}px`
    this.grid.appendChild(this.domGhost1)


    // populates walls (1d array of objects) - (make space for portals)
    // TODO remove this later
    // this.cells.forEach(row => {
    //   row.forEach(cell => {
    //     this.notWalls.forEach(position => {
    //       if (cell.xPos !== position[0] && cell.yPos !== position[1]) {
    //         cell.isWall = true
    //         this.walls.push(cell)
    //       }
    //     })
    //   })
    // })

    this.ghost1Track = [
      [12, 11], [11, 11], [10, 11], [9, 11], [9, 12], [9, 13], [9, 14], [9, 15], [9, 16], [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17], [18, 17], [18, 16], [18, 15], [18, 14], [18, 13], [18, 12], [18, 11], [17, 11], [16, 11], [15, 11], [14, 11], [13, 11]
    ]

  }

  startIntroAudio() {
    // this.introAudio.src = 'https://vgmsite.com/soundtracks/pac-man-game-sound-effects/gmiffyvl/Intro.mp3'
    this.introAudio.src = 'assets/audio/intro.mp3'

    this.introAudio.play()
  }

  playChompAudio() {
    if (this.chompActivated || this.pelletActivated) return

    this.chompActivated = true

    this.introAudio.src = 'https://vgmsite.com/soundtracks/pac-man-game-sound-effects/knwtmadt/Chomp.mp3'
    this.introAudio.play()
    setTimeout(() => {
      this.chompActivated = false
    }, 800)
  }

  playPelletAudio() {
    this.pelletActivated = true
    this.introAudio.src = 'assets/audio/trimmed_pellet_siren2.m4a'
    this.introAudio.play()
    setTimeout(() => {
      this.pelletActivated = false
    }, 8000)
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
    this.frightenedTimerId = null
    this.mode = 'chase'
    this.positionCounter = -1 //TODO remove this later

    // A star - pathfinding variables
    this.open = []
    this.closed = []
    this.finished = false // here or somewhere else
    this.path = []
    this.neighbours = []
  }

  startMoving() { // track is now unecessary

    this.moveTimerId = setInterval(() => {
      // switch statement based on mode determines various positions
      // declare positions of the start and end cells
      let startX = null
      let startY = null
      let endX = null
      let endY = null

      switch (this.mode) {
        case 'chase':
          endX = pacman.xPos
          endY = pacman.yPos
          break
        case 'back to base':
          endX = data.ghost2StartX
          endY = data.ghostStartY
          break
        case 'frightened':
          // define logic for 'frightened' later (this clause defines endX and endY) //TODO - temporarily making frightened = chase (change later)
          endX = pacman.xPos
          endY = pacman.yPos
          break
        default:
          break
      }

      startX = this.xPos
      startY = this.yPos

      // instantiate start and end cells
      const start = new Cell(startX, startY)
      const end = new Cell(endX, endY)

      // define algorithm()
      // function algorithm() { //TODO make sure this is called 

      // setup definitions
      start.g = 0
      start.f = 0
      this.open.push(start) // TODO first bug is here

      while (!this.finished) {
        // TODO - make sure you install underscore.js as a dependency to use this sort http://underscorejs.org/#sortBy
        // sort the cells in open by 'f' in ascending order
        this.open = _.sortBy(open, 'f') //TODO install library properly
        let current = open[0] // check if this needs to be in the constructor? should be ok here

        this.closed.push(current)

        // remove open[0] using splice
        this.open.splice(0, 1)

        if (current.xPos === end.xPos && current.yPos === end.xPos) { //this executes when the path is found.
          //constructPath() //TODO see how constructPath is called here. What does it have access to?
          // here is the path construction code:

          // this should be in the proper scope now. Access to neighbours etc

          // path construction performed locally

          this.path = [] // not needed?
          let pathnode = end

          while (pathnode.parent !== null) {
            this.path.push(pathnode)
            pathnode = pathnode.parent
          }

          // change this.xPos, this.yPos
          // analyse this.path (which is now populated), and 
          this.xPos = this.path[this.path.length - 1].xPos //TODO - there is a chance this might be - 1, not -2, prepare to change it if needed
          this.yPos = this.path[this.path.length - 1].yPos



          // update DOM
          data.domGhost1.style.left = `${data.cellWidth * this.yPos}px`
          data.domGhost1.style.top = `${data.cellHeight * this.yPos}px`


          this.finished = true
          return // does this exit the rest of the while loop, as it should?
        }

        this.neighbours = getNeighbours(this.current) //TODO make sure getNeighbours() passes copies of objects, not their references

        function isInClosed(neighbour) { // TODO come back to this
          this.closed.forEach(closedNode => {
            if (closedNode.xPos === neighbour.xPos && closedNode.yPos === closedNode.yPos) {
              return true
            }
          })
          return false
        }

        this.neighbours.forEach(neighbour => {
          isInClosed(neighbour)

          // isWall value should be copied from the original cell object stored in data.cells
          if (neighbour.isWall || isInClosed(neighbour)) {
            return // not the most idiomatic, but it will do
          }

          function isInOpen(neighbour) {
            this.open.forEach(openNode => {
              if (openNode.xPos === neighbour.xPos && openNode.yPos === neighbour.yPos) {
                return true
              }
            })
            return false
          }

          isInOpen(neighbour)

          if (!isInOpen(neighbour)) {
            this.open.push(neighbour)
            neighbour.parent = current
          }

          neighbour.g = current.g + 1
          neighbour.h = distanceBetween(neighbour, end)
          neighbour.f = neighbour.g + neighbour.h

          if (isInOpen(neighbour)) {
            if ((current.g + 1) < neighbour.g) {
              neighbour.g = (current.g + 1)
              neighbour.parent = current
              neighbour.f = neighbour.g + neighbour.h

              this.open = _.sortBy(open, 'f')
            }
          }
        })

        if ((current.xPos !== end.xPos || current.yPos !== end.yPos) && this.open.length === 0) { // careful with scope here
          console.log('Error: pathfinding failed')
          this.finished = true
        }
      }
      // } //TODO removing this algorithm closing brace


      // define constructPath()
      // function constructPath() {
      // this function needs access to: path (array), end (object), the parent of each cell
      // thus it must be allowed within the scope for which neighbours were defined
      // end is in the interval scope, which we are inside now. this.path is within the ghost object scope, which we are inside. 

      // basic structure:

      /*
      this.path = []
      pathnode = end

      while (pathnode.parent !== null) {
        this.path.push(pathnode)
        pathnode = pathnode.parent
      }
      */

      // }


      // run algorithm()
      // algorithm()//TODO removing this call
      // run constructPath()
      // constructPath()

      // change this.xPos and this.yPos based on an element of path (I think it's the second to last one)
      // this.xPos = path[path.length - 2].xPos
      // this.yPos = path[path.length - 2].yPos

      // update ghost on DOM (determine which ghost this is, then update that element)

      // reset variables like open, closed, path, (finished???, neighbours???)
      this.open = []
      this.closed = []
      this.finished = false
      this.path = []
      this.neighbours = []



      // ! old code - pre pathfinding
      // // Declare a 2d array called ghost 1 track. It’s elements are arrays. Within each of those array are two numbers, an x and a y position. Set the ghosts position. Each interval, increment an indexCounter and set the ghost’s x and y to the 0 and 1 of that array. Update the ghost DOM element as well.

      // // TODO edit this interval so that movement depends on this.mode
      // // switch (this.mode)

      // this.positionCounter += 1

      // if (this.positionCounter > (track.length - 1)) {
      //   this.positionCounter = 0
      // }

      // // update the ghost object's position
      // this.xPos = track[this.positionCounter][0]
      // this.yPos = track[this.positionCounter][1]

      // // update the ghost dom element's position
      // data.domGhost1.style.left = `${data.cellWidth * this.xPos}px`
      // data.domGhost1.style.top = `${data.cellHeight * this.yPos}px`


    }, data.ghostMovementInterval)
  }

  goToBase() {
    // this function is called when a collision happens when this.mode === 'frightened'
    // clear this.frightenedTimerId. This stops the mode from becoming 'chase' again

    clearTimeout(this.frightenedTimerId)
    this.mode = 'back to base'
    console.log(`mode: ${this.mode}`)

    // change the DOM element to red to reflect it returning to base
    data.domGhost1.style.backgroundImage = 'url(https://i.imgur.com/aWiJioF.png)' // change this according to which ghost is being changed
    data.domGhost1.style.backgroundSize = 'cover'
    data.domGhost1.style.backgroundPosition = 'center'
  }

  beFrightened() {
    // this function is called when the ghost needs to behave in a frightened way

    // be frightened until either: a timeout expires (in which case the normal mode cycle interval is re-engaged) or there is a match between pacman and the ghosts position, in which case their 'back to base' mode is activated, where they wait for a timeout before returning to the normal mode/cycle interval.

    // start a timeout. When it expires this.mode = 'chase'

    // start the frightenedTimerId here.kill it if a collision occurs in frightened mode (if it returns to base)

    if (data.activated) return

    data.activated = true

    this.mode = 'frightened'
    console.log(`mode: ${this.mode}`)
    data.domGhost1.style.backgroundImage = 'url(https://i.imgur.com/LtmciSP.png)' // change this according to which ghost is being changed
    data.domGhost1.style.backgroundSize = 'cover'
    data.domGhost1.style.backgroundPosition = 'center'

    this.frightenedTimerId = setTimeout(() => {
      this.mode = 'chase'
      data.domGhost1.style.backgroundImage = 'url(https://i.imgur.com/RHpMz2Y.png)'
      data.domGhost1.style.backgroundSize = 'contain'
      console.log(`mode: ${this.mode}`)
      data.activated = false
    }, 8300)
  }

  // functions: startMoving(), startCycling()
  startCycling() {
    // this.cycleTimerId = setInterval(() => {
    // each interval, change this.mode (use a switch statement to change from one mode to another)
    // }, constant goes here 5000?)
  }

}

class Cell {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    this.parent = null
    this.g = null
    this.h = null
    this.f = null
    this.isWall = false // or null?
    // this.colour = null?
  }
}

class GhostManager {
  constructor() {
    // is a constructor necessary? just use return?
  }

  releaseGhosts() {
    // start all ghost mode cycling and movement with a pause inbetween each one

    // mode cycling is now a stretch goal. Include this later
    // ghost1.startCycling()
    ghost1.startMoving()

    // TODO temporarily removing
    // setTimeout(() => {
    //   ghost2.startCycling()
    //   ghost2.startMoving()
    // }, 3000)

    // setTimeout(() => {
    //   ghost3.startCycling()
    //   ghost3.startMoving()
    // }, 3000)

    // setTimeout(() => {
    //   ghost4.startCycling()
    //   ghost4.startMoving()
    // }, 3000)
  }

  // frighten all ghosts
  frightenGhosts() {
    // if (data.lastActivated >= (Date.now() - data.delay)) // these 3 lines attempt to prevent bounce (but don't work)
    //   return
    // data.lastActivated = Date.now()

    data.ghosts.forEach(ghost => { // refactor all functions like this into a single line
      ghost.beFrightened()
    })
  }

  clearGhostTimers() {
    data.ghosts.forEach(ghost => {
      clearInterval(ghost.moveTimerId)
      clearTimeout(ghost.frightenedTimerId)
    })
  }

  resetPositionCounters() {
    data.ghosts.forEach(ghost => {
      ghost.positionCounter = -1
    })
  }
}

// Instantiate all objects
// Add each ghost to the data.ghosts array
const data = new Data()
const pacman = new Pacman(data.pacmanStartX, data.pacmanStartY)
const ghostManager = new GhostManager()
const ghost1 = new Ghost(data.ghost1StartX, data.ghostStartY)
const ghost2 = new Ghost(data.ghost2StartX, data.ghostStartY)
const ghost3 = new Ghost(data.ghost3StartX, data.ghostStartY)
const ghost4 = new Ghost(data.ghost4StartX, data.ghostStartY)
pushGhosts(ghost1, ghost2, ghost3, ghost4)


// ! MAIN

function main() {
  runGame()
  // temporarily removing - HFC should only be triggered when a collision takes place
  // handleFatalCollision()
}


function runGame() {
  beginPlay()

  // this timer id is cleared when handleFatalCollision is called
  data.monitorTimer = setInterval(() => {

    // checks for collision (of any kind)
    data.ghosts.forEach(ghost => {
      if (ghost.xPos === pacman.xPos && ghost.yPos === pacman.yPos) {
        if (ghost.mode !== 'frightened' && ghost.mode !== 'back to base') {
          console.log('fatal collision!')
          // run handleFatalCollision
          handleFatalCollision()
        } else if (ghost.mode === 'frightened') {
          console.log(`mode ${ghost.mode}`)
          data.score += data.captureScore
          document.querySelector('.score').innerHTML = `Score: ${data.score}` // this line is repeated - refactor by moving it after each function
          console.log('ghost eaten!')

          ghost.goToBase()
        }
      }
    })

    // opportunity for refactor here:

    // if pacman eats smallFood, remove that element from smallFood positional array, update DOM, increase score
    data.smallFood.forEach(position => {
      if (position[0] === pacman.xPos && position[1] === pacman.yPos) {
        const index = data.smallFood.indexOf(position)
        data.smallFood.splice(index, 1)

        document.getElementById(`${pacman.xPos}, ${pacman.yPos}`).classList.remove('small-food')

        data.score += data.smallScore
        document.querySelector('.score').innerHTML = `Score: ${data.score}`

        data.playChompAudio()
      }
    })

    // if pacman eats bigFood, remove that element from positional array, update DOM, increase score, call ghostManager to activate frightened mode
    data.bigFood.forEach(position => {
      if (position[0] === pacman.xPos && position[1] === pacman.yPos) {
        const index = data.bigFood.indexOf(position)
        data.bigFood.splice(index, 1)

        document.getElementById(`${pacman.xPos}, ${pacman.yPos}`).classList.remove('big-food')

        data.score += data.bigScore
        document.querySelector('.score').innerHTML = `Score: ${data.score}`

        ghostManager.frightenGhosts()

        data.playPelletAudio()
      }
    })

  }, 55) //lengthen this interval to decrease the browser's workload (maybe run the game more smoothly)

  // TODO temporarily removing portals
  // // for the portal monitors we need to handle the pacman dom element as well
  // // check left portal
  // if (data.portalPosition[0] === data.pacmansPos) {
  //   pacman.xPos = data.portalPosition[1][0]
  //   pacman.yPos = data.portalPosition[1][1]
  // }

  // // check right portal
  // if (data.portalPosition[1] === data.pacmansPos) {
  //   pacman.xPos = data.portalPosition[0][0]
  //   pacman.yPos = data.portalPosition[0][1]
  // }
}

function handleFatalCollision() {
  // maybe it's not needed? since this can only run at the end?
  if (data.fatalActivated) return
  data.fatalActivated = true

  data.livesLeft -= 1
  // clear all timers
  clearInterval(data.monitorTimer)
  clearInterval(data.pacmanTimer)
  ghostManager.clearGhostTimers()

  // if 0 lives left, game over
  if (data.livesLeft < 1) {
    data.fatalActivated = false
    gameOver()
  } else if (data.livesLeft > 0) { // if there are lives left, reset positions and restart game
    data.fatalActivated = false
    pacman.guide = null
    ghostManager.resetPositionCounters()
    resetPositions()
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
      data.domPacman.style.backgroundImage = 'url(https://i.imgur.com/dp2wDpB.png)'
      break
    case 'ArrowUp':
      pacman.guide = 'up'
      data.domPacman.style.backgroundImage = 'url(https://i.imgur.com/kSggDsb.png?1)'
      break
    case 'ArrowRight':
      pacman.guide = 'right'
      data.domPacman.style.backgroundImage = 'url(https://i.imgur.com/OObC8pE.png)'
      break
    case 'ArrowDown':
      pacman.guide = 'down'
      data.domPacman.style.backgroundImage = 'url(https://i.imgur.com/hys9pkO.png?1)'
      break
    case 'Space':
      if (!data.started) {
        data.started = true
        main() // this begins the game
      }
      break
    default:
      break
  }
}

// add keydown event listener
document.addEventListener('keydown', handleKeyDown)

function beginPlay() {
  if (data.livesLeft === 3) {
    data.startIntroAudio()

    setTimeout(() => {
      // make a call to a function from the pacman object that starts the movement interval, use timer ids to give it a timer
      pacman.startMoving()

      // call ghostManager to release ghosts
      ghostManager.releaseGhosts()
    }, 1) // TODO shortening this for testing - original value is 4300
  } else {
    pacman.startMoving()
    ghostManager.releaseGhosts()
  }

}

function gameOver() {
  console.log('game over')
  // TODO add a more advanced game over screen
  // create a div that covers the whole screen, blurs background, resets values etc

  // Poor man's reset
  alert(`Game over! Your score is ${data.score}.\nPress ok to play again`)
  location.reload()
}

function resetPositions() {
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
}

// begin program execution
// main()

// A star helper functions

// heuristic: Manhattan distance (NOT Euclidian)
function distanceBetween(nodeA, nodeB) {
  const xDistance = Math.abs(nodeA.xPos, nodeB.xPos)
  const yDistance = Math.abs(nodeA.yPos - nodeB.yPos)
  const distance = xDistance + yDistance
  return distance
}

function getNeighbours(node) {
  const neighbours = []
  const i = node.xPos
  const j = node.yPos

  // define originalAbove = data.cells[j - 1][i]
  // define originalBelow = data.cells[j + 1][i]
  // define originalLeft = data.cells[j][i - 1]
  // define originalRight = data.cells[j][i + 1]
  // instantiate 4 new cell objects.
  // edit each of their properties to match their corresponding original.property
  // push each of these new objects to neighbours

  const originalAbove = data.cells[j - 1][i]
  const originalBelow = data.cells[j + 1][i]
  const originalLeft = data.cells[j][i - 1]
  const originalRight = data.cells[j][i + 1]

  const copyAbove = new Cell(j - 1, i)
  const copyBelow = new Cell(j + 1, i)
  const copyLeft = new Cell(j, i - 1)
  const copyRight = new Cell(j, i + 1)

  // copy all properties from each cell object (with the exception of .parent, which is a complex type and is defined later anyway)

  // copy cell above
  copyAbove.xPos = originalAbove.xPos
  copyAbove.yPos = originalAbove.yPos
  copyAbove.g = originalAbove.g
  copyAbove.h = originalAbove.h
  copyAbove.f = originalAbove.f
  copyAbove.isWall = originalAbove.isWall

  // copy cell below
  copyBelow.xPos = originalBelow.xPos
  copyBelow.yPos = originalBelow.yPos
  copyBelow.g = originalBelow.g
  copyBelow.h = originalBelow.h
  copyBelow.f = originalBelow.f
  copyBelow.isWall = originalBelow.isWall

  // copy cell left
  copyLeft.xPos = originalLeft.xPos
  copyLeft.yPos = originalLeft.yPos
  copyLeft.g = originalLeft.g
  copyLeft.h = originalLeft.h
  copyLeft.f = originalLeft.f
  copyLeft.isWall = originalLeft.isWall

  // copy cell right
  copyRight.xPos = originalRight.xPos
  copyRight.yPos = originalRight.yPos
  copyRight.g = originalRight.g
  copyRight.h = originalRight.h
  copyRight.f = originalRight.f
  copyRight.isWall = originalRight.isWall


  //TODO bare in mind, these properties, like g, h, f, should be properly defined. They are actually defined later

  // push each cell copy into neighbours
  neighbours.push(copyAbove) // above
  neighbours.push(copyBelow) // below
  neighbours.push(copyLeft) // left
  neighbours.push(copyRight) // right

  return neighbours
}

