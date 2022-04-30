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
const mine_proba = 4
let recentTile = ""
let explodedTiles = []
const maxExplode = 1
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
  body.classList.add("won")
  alert("you have won, congrats")
  stopTimer()
  //need to put in place a timer that will end here:

  //extra styles for the lost need to go here:

  //this is the section for the form timer
  const formTime = document.querySelector("#timerScore")
  const formContainer = document.querySelector(".form__container")
  formTime.value = timerCounter
  formContainer.style["display"] = "flex"
}

function lose() {
  //console.log("you have lost")
  showMines()
  body.classList.add("lost")
  alert("you have lost")
  const hidden = document.querySelectorAll(".hidden")
  hidden.forEach((tile) => {
    tile.removeEventListener("click", () => {
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

      if (hidden.length == numTiles - 1) {
        //the first click has been detected
        //console.log("is the first click")
        addMines(parseInt(tile.id[0]), parseInt(tile.id[2]))
      }

      if (tile.textContent == "") {
        explodeTiles(parseInt(tile.id[0]), parseInt(tile.id[2]))
      }
    })
  })
  stopTimer()
  win()
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
        console.log("Trying to explode some tiles")
        explodeTiles(parseInt(tile.id[0]), parseInt(tile.id[2]))
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
    console.log(
      "tile id",
      tile.id,
      "versus ",
      noTouchId[0],
      noTouchId[2],
      distance(parseInt(tile.id[0]), parseInt(noTouchId[0]))
    )
    if (
      tile.id != noTouchId &&
      distance(parseInt(tile.id[0]), parseInt(noTouchId[0])) > maxExplode &&
      distance(parseInt(tile.id[2]), parseInt(noTouchId[2])) > maxExplode
    ) {
      // can generate mines
      console.log("generating some mines")
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
  //console.log(explodedTiles)
  //takes in two INTEGERS, recursively destroyes tiles that are around it if they are empty
  const mainTile_Id = x.toString() + "_" + y.toString()
  const mainTile = document.getElementById(mainTile_Id)
  //if the function has been called then the tile has to be removed
  if (mainTile.textContent != "💣") {
    mainTile.classList.remove("hidden")
  }

  // this is the main thing
  if (mainTile.textContent == "" && isIn(mainTile_Id, explodedTiles) == false) {
    explodedTiles.push(mainTile.id)
    for (
      let k = 0;
      k <
      tilesToCount(parseInt(mainTile_Id[0]), parseInt(mainTile_Id[2])).length;
      k++
    ) {
      let secondaryTile_id =
        tilesToCount(parseInt(mainTile_Id[0]), parseInt(mainTile_Id[2]))[k][0] +
        "_" +
        tilesToCount(parseInt(mainTile_Id[0]), parseInt(mainTile_Id[2]))[k][2]
      let secondaryTile = document.getElementById(secondaryTile_id)
      secondaryTile.classList.remove("hidden")
      if (secondaryTile.textContent == "") {
        explodeTiles(
          parseInt(
            tilesToCount(parseInt(mainTile_Id[0]), parseInt(mainTile_Id[2]))[
              k
            ][0]
          ),
          parseInt(
            tilesToCount(parseInt(mainTile_Id[0]), parseInt(mainTile_Id[2]))[
              k
            ][2]
          )
        )
      }
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

generateGame()
