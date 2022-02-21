## Overview
I completed this solo project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was my submission for module one. During module one, we learnt the basics of HTML and CSS, as well as JavaScript and some fundamental programming concepts (data types, scope, objects, classes etc). Due to my prior experience these programming concepts were not new to me, however this was my first exposure to JavaScript. The finished project can be found [here](https://tigeryant.github.io/sei-project-one/).

<p align="center">
<img src="https://i.imgur.com/Gi188wa.png" width="400px"></img>
  </p>
  
## Brief
We were given one week to build a browser-based game from a set of choices using the skills we had learnt in the first two weeks of the course - HTML, CSS and JavaScript.

## Technologies used
* HTML
* CSS
* JavaScript

## Approach
After looking through the list of games to choose from, I knew that Tetris and Pacman were the two most complicated games, and the hardest to build. I decided to challenge myself by picking Pacman because I have fond memories of playing this game as a child. Seeing as I already had experience with object oriented programming prior to the course, I knew that one of the most challenging aspects of this project would be applying these principles to JavaScript, which was new to me at this stage.

## Planning
> ‘Give me six hours to cut down a tree, and I will spend the first four sharpening the axe’ - Abraham Lincoln

I am always reminded of this quote whenever I begin a new software project, and this exercise was no exception. I am a great believer that spending more time planning leads to far fewer bugs and/or overhauls in the latter stages of the build. 

Of the seven days we were given to complete the project, I spent the first two to three writing notes and drawing diagrams, most of which were regarding the flow and architecture of the program. 

Some of the main questions that arose at this stage were:
* In what order will functions be called?
* Will entity state be managed on an individual basis, or according to a central ‘state manager’?
* How will entities traverse the graph (the grid)?
* What happens when a collision occurs?
* How is user input handled?
* How will ghosts cycle through various modes of behaviour?

Having recently been reading the seminal book ‘Clean Code’ by Robert C. Martin, the principle of ‘separation of concerns’ was on my mind. Due to this, I created a delineation between the initialisation of objects and their use. This means that all objects are initialised before the rest of the program runs.

I planned for the program to have the following classes: Data, Pacman, Ghost, Cell and GhostManager. I also thought about some important functionality the game should have: initialisation (of the grid, pacman, etc), movement (ghosts and pacman), collision handling, portals, scoring, audio and reset. Here are some descriptions of the classes used:

### Data
The Data object is created at the start of runtime. It initialises various state variables, the grid, positions of static items on the grid, such as food, portals and the ghost base, and contains methods that play audio clips at certain times during runtime. The grid layout was based on the following image:

<p align="center">
<img src="https://i.imgur.com/ZSpB7mo.png" width="300px" height="340px" margin-left="100px"></img>
</p>

### Pacman
The Pacman class contains variables that determine its position on the grid, and a method that manipulates that position.

### Ghost
The Ghost class contains variables that determine its position and mode, as well as methods that manipulate these properties.

### Cell
The Cell class contains variables that determine its position and a boolean variable that determines if it’s a barrier or not.

### GhostManager
The GhostManager has no constructor. It contains methods that are called when certain Ghost methods need to be called on each ghost. An example of this is when Pacman collides with a big pellet and causes the ghosts to go into ‘frightened’ mode. The `frightenGhosts()` method of the GhostManager class is called, which in turn loops through each of the ghosts and calls a method that causes their mode to change. In this sense, the GhostManager is a conduit between other objects and the ghosts.


## Build
The following section gives an overview of the flow of the program at runtime.

First, an initialisation process takes place. This creates objects such as the grid, Pacman, ghosts, and the ghost manager.

```javascript
const data = new Data()
const pacman = new Pacman(data.pacmanStartX, data.pacmanStartY)
const ghostManager = new GhostManager()
const ghost1 = new Ghost(data.ghost1StartX, data.ghostStartY)
const ghost2 = new Ghost(data.ghost2StartX, data.ghostStartY)
const ghost3 = new Ghost(data.ghost3StartX, data.ghostStartY)
const ghost4 = new Ghost(data.ghost4StartX, data.ghostStartY)
pushGhosts(ghost1, ghost2, ghost3, ghost4)
```

After initialisation, main is called, which invokes a single function.

```js
function main() {
 runGame()
}
```

This function in turn calls the beginPlay() function.

```javascript
function runGame() {
 beginPlay()
…
}
```

`Beginplay()` makes calls that trigger Pacman’s movement and the ghosts’, and plays the intro theme tune.

```javascript
function beginPlay() {
 if (data.livesLeft === 3) {
   data.startIntroAudio()
   setTimeout(() => {
     pacman.startMoving()
     ghostManager.releaseGhosts()
   }, 4300)
 } else {
   pacman.startMoving()
   ghostManager.releaseGhosts()
 }
}
```

When Pacman and the ghosts have started moving, a loop begins which is run at 20ms intervals. It performs the following functions:
* Check for collisions between each of the ghosts and Pacman
* Check for collisions between Pacman and the small pellets
* Check for collisions between Pacman and the big pellets
* Check if Pacman enters either of the portals at the sides of the maze

### Pacman collides with big pellet
In this scenario, all the ghosts are put in ‘frightened’ mode. This is done by calling `ghostManager.frightenGhosts()`, which in turn calls `beFrightened()` on each ghost object. This method changes the ghost’s mode to ‘frightened’ for 8300ms, before changing it back to ‘chase’, assuming the ghost was not caught during that period. Here is the `beFrightened()` method:

```javascript
beFrightened() {
   if (data.activated) return
   data.activated = true
   this.mode = 'frightened'
   console.log(`mode: ${this.mode}`)
   data.domGhost1.style.backgroundImage = 'url(https://i.imgur.com/LtmciSP.png)'
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
```

### Pacman collides with small pellet
When Pacman collides with a small pellet, that element is removed from the DOM, and the player’s score is incremented.

```javascript
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
```

### Pacman collides with ghost
In the event that Pacman collides with a ghost, one of two things can happen, based on the ghost’s mode. If the ghost is ‘frightened’, the player’s score is incremented, and the ghost is returned to the base. If the ghost is in chase mode, a fatal collision has occurred, which, depending on the player’s number of lives left, causes the game to end, or the entity positions to be reset.

```javascript
   data.ghosts.forEach(ghost => {
     if (ghost.xPos === pacman.xPos && ghost.yPos === pacman.yPos) {
       if (ghost.mode !== 'frightened' && ghost.mode !== 'back to base') {
         handleFatalCollision()
       } else if (ghost.mode === 'frightened') {
         data.score += data.captureScore
         document.querySelector('.score').innerHTML = `Score: ${data.score}` 
         ghost.goToBase()
       }
     }
   })
```

### Pacman enters portal
In the event that Pacman enters a portal, Pacman’s position is set to the opposite side of the screen. Here is the block that checks the left portal:

```javascript
if (data.portals[0][0] === pacman.xPos && data.portals[0][1] === pacman.yPos) {
     if (data.rightPortalTriggered) return
     data.leftPortalTriggered = true
     pacman.xPos = data.portals[1][0]
     pacman.yPos = data.portals[1][1]
     data.domPacman.style.left = `${data.cellWidth * data.portals[1][0]}px`
     data.domPacman.style.top = `${data.cellHeight * data.portals[1][1]}px`
     
     setTimeout(() => {
       data.leftPortalTriggered = false
     }, 500)
   }
```

## Known bugs
One bug I am currently aware of is that sometimes Pacman and the ghosts can walk ‘through’ each other, when a fatal collision should actually occur. This is to do with the synchronisation of the intervals of Pacman’s movement and the function that checks for collisions. The situation can occur in which Pacman and a ghost share a cell for a period so short that it is not registered by the collision checker.

## Challenges
One of the biggest challenges of this project was to implement ghost movement. Ideally, when ghosts chase Pacman, they should traverse the maze according to a pathfinding algorithm, such as A star or Dijkstra’s, where the ghost is the source and Pacman is the target. As I had already implemented A star in Python beforehand (see the repository [here](https://github.com/tigeryant/a-star-pathfinding-algorithm)), I decided to opt for this one. I spent the last two days of the assignment translating the Python code I had written into JavaScript. Unfortunately, I ran out of time before the deadline to fully implement my solution.

Another big challenge was the implementation of Pacman’s movement. I wanted to make sure that if Pacman was moving unimpeded onto a free cell, and the user pushed a key that directed Pacman into a wall, Pacman would continue to move in the original direction until a cell in the user’s desired direction became available. This led me to come up with the concept of a ‘guide cell’ and a ‘travel cell’. The guide cell represents the cell that the user has directed Pacman to travel to, and the travel cell represents the cell Pacman would travel to otherwise. If the guide cell is obstructed, Pacman will move to the travel cell. If not, Pacman will move to the guide cell, and the direction of travel will change.

## Wins
This project gave me a great opportunity to hone my skills, including those of systems design and architecture, working to a deadline, and use of HTML, CSS and JavaScript.

## Future features
Future iterations of this program would include:
* A star algorithm for ghost movement
* Levels of varying difficulty
* Behaviour unique to each ghost
* The separation of different parts of the codebase into multiple files

## Key learnings
One of the most important things I took from this experience was the importance of building a minimum viable product (MVP) before working on improved functionality or more features. An example of this in this project was being sure to only start work on the pathfinding algorithm after basic movement had been implemented. This meant that I could revert back to a working version when the extended version was not ready.
