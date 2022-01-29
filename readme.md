# SEI Project One - Pacman
## Preamble
I completed this solo project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was my submission for module one. During module one, we learnt the basics of HTML and CSS, as well as JavaScript and some fundamental programming concepts (data types, scope, objects, classes etc). Due to my prior experience these programming concepts were not new to me, however this was my first exposure to JavaScript. The finished project can be found [here](https://tigeryant.github.io/sei-project-one/).

## Aim
We were given a week to create a game from a set list of options. I decided to challenge myself by picking one of the harder options - Pacman. I tried to model my own version on the original by giving it retro styling. A screenshot can be seen below.

<p align="center">
<img src="https://i.imgur.com/Gi188wa.png" width="300px" height="340px" margin-left="100px"></img>
                                                                                           </p>

## Approach
I spent the first two days planning; in particular I wrote about the various different functions and classes that would be needed and how data would be stored and accessed. I find this technique helps to give me a broad overview of the program, without getting distracted by implementation details in the early stages. Once this was complete, I began building the more fundamental structures, and then focused on the more intricate parts. I tried to follow a fundamental design principle written in ‘Clean Code’, which is to separate the construction of the objects the program will use from the actual use of them. The initialisation of objects happens at the beginning of runtime, and the use of them follows.

## Components
The game is comprised of various different aspects, including a grid system and maze through which entities navigate, scoring, audio, lives, portals, pacman movement, collisions between entities, resetting the state and also ghost behaviour. By far the most challenging was the ghost behaviour.

## Ghost behaviour
In the original version of the game, the ghosts cycle between the following movement modes: ‘scatter’, ‘chase’ and ‘frightened’. Each of the ghosts also has its own ‘personality’, that is, their movement is determined by different algorithms.

## Pathfinding
In the final few days of the project, after I had built an MVP, I turned my attention to implementing more advanced ghost movement. I knew that in order for ghosts to ‘chase’ pacman, they would have to move according to a pathfinding algorithm. I had previously implemented the [A star pathfinding algorithm](https://github.com/tigeryant/A-star-pathfinding-algorithm) in Python, so I opted for that. Unfortunately I ran out of time before I could properly implement and debug the algorithm, but it was useful and fun to have the experience of translating code from Python to JavaScript.

## Conclusion
This project solidified my knowledge of JavaScript and the DOM, and was good practise in working to a deadline.
