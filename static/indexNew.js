// this is the new JS file for the NSI sweeper project.
// this rewrite is to try and make the old code cleaner and thus more readable for when I have to present this thing
//All code shown here is property of Archie Beales

//this is the intro section, here is code made to make sure that the file is not corrupt
//console.log("Hello there, my name is indexNew.JS")

//declaration of all the things I need to start the functions
const game_box = document.querySelector(".game")
const body = document.querySelector(".game-area")
//the height and width of the minesweeper game in the number of tiles
//for now the game will be locked at 9x9 squares
const game_box_width = 9
const game_box_height = 9
//The probability that mines will spawn
const mine_proba = 6
let recentTile = ""
/* the tiles that have been exploded so far, /to avoid infinite recursion */
let explodedTiles = []
/* the distance that the explode tiles function can explode to */
const maxExplode = 3
//elapsed time is counted in seconds
let elapsedTime = 0
const timer = document.querySelector(".time")
let timerCounter = timer.textContent
let clicked = false

/* variables for the timer */
let min = 0
let sec = 0
let hr = 0
let stoptime = true

//Here will be the functions for when a player wins and loses the game
function win() {
  return none
}

function lose() {
  //console.log("you have lost")
  return none
}
//need to put in place a timer that will end here:

//extra styles for the win need to go here:

//HERE are the functions used for generating the game, the number, the mines etc....--------------

function generateGame() {
  // this function will be used to do A LOT of the generation for the game, including all the buttons and all that
  //console.log("Generating the game now...")
  //the loop that makes the columns
  for (let i = 1; i < game_box_width + 1; i++) {
    //makes the column div
    const column = document.createElement("div")
    column.classList.add("column")

    //looping and adding square to the column
    for (let j = 1; j < game_box_height + 1; j++) {
      //generating the tiles
      const square = document.createElement("div")
      square.classList.add("tile")
      square.classList.add("hidden")
      square.textContent = ""

      //adding the x y value to the ID of the square
      square.id = i + "_" + j

      //adding the square to the column element
      column.appendChild(square)
    }
    //adding the column element to the actual container
    game_box.appendChild(column)
  }

  //end of the actual generation mooving on to the putting in place of the buttons
  //this little snippet adds the button to each of the tiles making it possible to click them
  const squares = document.querySelectorAll(".tile")

  squares.forEach((tile) => {
    //looping for adding the buttons to the tiles to make it clickable
    tile.addEventListener("click", () => {
      tile.classList.remove("hidden")
      //the number of tiles total
      let numTiles = game_box_height * game_box_width
      const hidden = document.querySelectorAll(".hidden")

      //sets the most recent Tile that has been pressed
      recentTile = tile.id

      if (check_win() == true) {
        //the player has won the game
        win()
      } else if (tile.textContent == "💣") {
        lose()
      }

      if (hidden.length == numTiles - 1 && clicked == false) {
        clicked = true
        //the first click has been detected
        console.log("is the first click")
        addMines(parseInt(tile.id[0]), parseInt(tile.id[2]))
        startTimer()
      }
      if (tile.textContent == "") {
        explodeTiles(tile.id[0], tile.id[2])
      }
    })
  })
}

function addMines(x, y) {
  //this function generates mines all around apart from the tiles whos ids are in parameters
  //console.log("adding all the mines now...")
  const tiles = document.querySelectorAll(".tile")
  const noTouchId = x.toString() + "_" + y.toString()
  tiles.forEach((tile) => {
    if (tile.id != noTouchId) {
      // can generate mines
      randomNum = Math.round(Math.random() * mine_proba)
      if (randomNum == 1) {
        tile.textContent = "💣"
        tile.classList.add("mine")
        //adds 1 to the number around this tile that is a bomb
        count_mines(parseInt(tile.id[0]), parseInt(tile.id[2]))
      }
    }
  })
}

function count_mines(x, y) {
  //when called, takes all the tiles around the one given in parameter and add 1 to each of the text contents

  //console.log("starting the mine counting function")
  //console.log("mine being counted", x, y)

  //gets the list of tiles available around the mine
  const tiles_count = tilesToCount(x, y)
  //console.log(tiles_count)

  //loop to go through each tile to add 1 to
  for (let k = 0; k < tiles_count.length; k++) {
    //getting the DOM object of the tile being added
    const tile = document.getElementById(tiles_count[k])
    //console.log("tile is ", tiles_count[k])

    //check to make sure you are not replacing text content of the mine
    if (tile.classList.contains("mine")) {
      //equivalent of a pass in python lol
    } else {
      // if the tile is empty adds the value of 1 to it
      if (tile.textContent == "") {
        //if the counter for the current tile is actually at 0
        let num = 1
        tile.textContent = num
      } else {
        //if tile not empty just add one to the existing number
        let num_str = tile.textContent
        let num_int = parseInt(num_str)
        tile.textContent = num_int + 1
      }
    }
  }
}

function tilesToCount(x, y) {
  //takes in INTEGERS and returns the tiles around it to be counted
  let result = []

  const id1 = (x - 1).toString() + "_" + (y - 1).toString()
  const id2 = (x - 1).toString() + "_" + y.toString()
  const id3 = (x - 1).toString() + "_" + (y + 1).toString()
  const id4 = x.toString() + "_" + (y - 1).toString()
  const id5 = x.toString() + "_" + (y + 1).toString()
  const id6 = (x + 1).toString() + "_" + (y - 1).toString()
  const id7 = (x + 1).toString() + "_" + y.toString()
  const id8 = (x + 1).toString() + "_" + (y + 1).toString()

  let lst = [id1, id2, id3, id4, id5, id6, id7, id8]
  for (let i = 0; i < lst.length; i++) {
    if (
      parseInt(lst[i][0]) < 10 &&
      parseInt(lst[i][2]) < 10 &&
      parseInt(lst[i][0]) > 0 &&
      parseInt(lst[i][2]) > 0 &&
      lst[i].length < 4
    ) {
      result.push(lst[i])
    }
  }
  return result
}

function explodeTiles(x, y) {
  /* complete redesign of this function */
  const tile_id = x.toString() + "_" + y.toString()
  const tile = document.getElementById(tile_id)
  /* here is the DOM object for the tile we are checking */
  console.log(explodedTiles, tile_id)
  /* thing we need to check for, repeated uses, if it is a mine, if it is too far */
  if (
    isIn(tile_id, explodedTiles) == false &&
    tile.textContent != "💣" &&
    distance(recentTile[0], tile_id[0]) < maxExplode &&
    distance(recentTile[2], tile_id[2]) < maxExplode
  ) {
    /* here we know that the tile has not been edited */
    if (tile.textContent != "💣") {
      /* no empty tiles for us */
      tilesSurrounding = tilesToCount(
        parseInt(tile_id[0]),
        parseInt(tile_id[2])
      )
      console.log(tilesSurrounding, "hi there")
      tilesSurrounding.forEach(newTile, () => {
        explodedTiles.push(tile)
        console.log(explodedTiles)
        explodeTiles(newTile[0], newTile[2])
      })
    } else if (tile.textContent == "") {
      explodedTiles.push(tile)
      explodedTiles(tile.id[0], tile.id[2])
    }
  }
}

function showMines() {
  //shows all the mines on the board
  //console.log("showing mines")
  const mines = document.querySelectorAll(".mine")
  mines.forEach((mine) => {
    mine.classList.remove("hidden")
  })
}

/* code that is completely stolen */
function startTimer() {
  if (stoptime == true) {
    stoptime = false
    timerCycle()
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec)
    min = parseInt(min)
    hr = parseInt(hr)

    sec = sec + 1

    if (sec == 60) {
      min = min + 1
      sec = 0
    }
    if (min == 60) {
      hr = hr + 1
      min = 0
      sec = 0
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec
    }
    if (min < 10 || min == 0) {
      min = "0" + min
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr
    }

    timer.innerHTML = hr + ":" + min + ":" + sec
    timerCounter = hr + ":" + min + ":" + sec

    setTimeout("timerCycle()", 1000)
  }
}
/* code that is not stolen */

//alternate functions usded for small calculations:---------
function distance(a, b) {
  //gives back the distance between 2 tiles
  if (a > b) {
    return a - b
  } else if (b > a) {
    return b - a
  } else {
    return 0
  }
}
function check_win() {
  //return true if all the tiles except the mines are uncovered
  //console.log("checking for win ....")
  hidden = document.querySelectorAll(".hidden")
  mines = document.querySelectorAll(".mine")
  if (hidden.length == mines.length) {
    return true
  } else {
    return false
  }
}
function isIn(elmt, lst) {
  for (let i = 0; i < lst.length; i++) {
    if (lst[i] == elmt) {
      return true
    }
  }
  return false
}

function generateLeaderBoard(arr) {
  /* the entered array is an array for arrays which have a name and a score value being the time */
  const leaderBoard = document.querySelector("#leaderBoard")
  /* making the loop for the amount of elmts in the array */
  for (let i = 0; i < arr.length; i++) {
    /* making the elmt that will be the line in the leaderboard area */
    div = document.createElement("div")
    div.classList.add("leaderBoard__line")
    /* making the elements that will contain the info */
    username = document.createElement("div")
    username.classList.add("leaderBoard__elmt")
    score = document.createElement("div")
    score.ClassList.Add("leaderBoard__elmt")
    /* adding the user name and score to the elements we created */
    username.textContent = arr[i][0]
    score.textContent = arr[i][0]
    /* appending the content divs to the line divs */
    div.appendChild(username)
    div.appendChild(score)
    /* appending the main div to leaderboard area */
    leaderBoard.appendChild(div)
  }
}

/* here is for when thomas finishes his shit */
/* generateLeaderBoard(arrthing) */
generateGame()
