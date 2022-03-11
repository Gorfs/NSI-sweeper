//area where I am going to put my code
console.log("hello world")
//adding all the DOM elements that I am going to target
const game_box = document.querySelector(".game")

//getting the height and width of the game area in pixels
const game_box_width = 9
const game_box_height = 9
//mine proba function the higher the less mines there are
const mine_proba = 6

//the size of each tile in pixels\
//declares in let as it can be changed futher on
let tile_pixel_size = 50

//this to see all the tiles that have been couted by the explode tiles function
let checkedTiles = []

//calculate how many square I can make
function num_squares(height, width, px) {
  //should return an array with the first elmt being and amount of square on the height and the second being the amount of squares on the width based on the px amount listed
  result = [Math.floor(height / px), Math.floor(width / px)]
  return result
}

function generateGame(height, width) {
  // height and width should be in tiles and not in pixels
  //should make all the square and append them to the parent elmt

  //making the identifiying "signature of each square"
  //ici va etre les coordonner que on va devoir utiliser pour le bot
  let x = 0
  let y = 0

  //making the loop that will make all of the columns
  for (let i = 1; i < width + 1; i++) {
    const column = document.createElement("div")
    column.classList.add("column")
    //looping through and making all the square in each column
    for (let j = 1; j < height + 1; j++) {
      //making each of the squares that will be appended to the column element
      const square = document.createElement("div")
      square.classList.add("tile")
      square.classList.add("hidden")
      //square.classList.add("hidden")
      square.textContent = ""

      //adding the x y value to the ID of the square
      square.id = i + "_" + j

      //adding the square to the column element
      column.appendChild(square)
    }
    //adding the column element to the actual container
    game_box.appendChild(column)
  }

  const squares = document.querySelectorAll(".tile")

  squares.forEach((tile) => {
    //looping for adding the buttons to the tiles to make it clickable
    add_button(tile)
  })
}

function addMines(x, y){
  //function that is called on first click that adds mines except where the player has played
  console.log("should  be adding the mines now")
  const tiles = document.querySelectorAll(".tile")
  tiles.forEach((tile) => {
    console.log(tile)
    let random_num = Math.round(Math.random() * mine_proba)
    console.log(random_num)

    //testing to make the probability work
    if (random_num == 0 && tile.id[0] != x && tile.id[2] != y){
      //putting a tile on the board
      tile.classList.add("mine")
      tile.textContent = "💣"
      count_mines(parseInt(tile.id[0]) , parseInt(tile.id[2]))
    }
  })
}


function tilesToCount(x, y){
  //this function takes the x and y coordanates of a tile and 
  //returns a list of the ids of the tiles to check for
  let tiles_count = []

  if (x > 1 && x < game_box_width && y > 1 && y < game_box_height) {
    //no limits
    // no limits whatsoever so just push all of the tiles
    const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
    const tile1 = document.getElementById(tile1_id)

    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
    const tile3 = document.getElementById(tile3_id)

    const tile4_id = x.toString() + "_" + (y - 1).toString()
    const tile4 = document.getElementById(tile4_id)

    const tile5_id = x.toString() + "_" + (y + 1).toString()
    const tile5 = document.getAnimations(tile5_id)

    const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
    const tile6 = document.getElementById(tile6_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
    const tile8 = document.getElementById(tile8_id)

    //the mother of all pushes lmao
    tiles_count.push(
      tile1_id,
      tile2_id,
      tile3_id,
      tile4_id,
      tile5_id,
      tile6_id,
      tile7_id,
      tile8_id
    )
  } else if (x == 1) {
    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    tiles_count.push(tile7_id)

    if (y == 1) {
      // the tile is on the left and on the bottom
      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
      const tile6 = document.getElementById(tile6_id)

      tiles_count.push(tile5_id, tile6_id)
    } else if (y == game_box_height) {
      // the tile is on the top and the left
      const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
      const tile8 = document.getElementById(tile8_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      tiles_count.push(tile8_id, tile4_id)
    } else {
      // on the left with no limits
      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
      const tile6 = document.getElementById(tile6_id)

      const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
      const tile8 = document.getElementById(tile8_id)

      tiles_count.push(tile4_id, tile5_id, tile6_id, tile8_id)
    }
  } else if (x == game_box_width) {
    const tile2_id = (x - 1).toString() + "_" + y.toString()

    tiles_count.push(tile2_id)
    if (y == game_box_height) {
      //the tile is in the bottom right

      const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
      const tile3 = document.getElementById(tile3_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      tiles_count.push(tile2_id, tile3_id, tile4_id, tile5_id)
    } else if (y == 1) {
      //tile is in the top right
      const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
      const tile1 = document.getElementById(tile1_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      tiles_count.push(tile1_id, tile2_id, tile4_id)
    } else {
      //the tile is on the right but no limits
      const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
      const tile1 = document.getElementById(tile1_id)

      const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
      const tile3 = document.getElementById(tile3_id)

      const tile4_id = x.toString() + "_" + (y - 1).toString()
      const tile4 = document.getElementById(tile4_id)

      const tile5_id = x.toString() + "_" + (y + 1).toString()
      const tile5 = document.getAnimations(tile5_id)

      tiles_count.push(tile1_id, tile3_id, tile4_id, tile5_id)
    }
  } else if (y == 1) {
    //tile is on the bottom
    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile3_id = (x - 1).toString() + "_" + (y + 1).toString()
    const tile3 = document.getElementById(tile3_id)

    const tile5_id = x.toString() + "_" + (y + 1).toString()
    const tile5 = document.getAnimations(tile5_id)

    const tile6_id = (x + 1).toString() + "_" + (y + 1).toString()
    const tile6 = document.getElementById(tile6_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    tiles_count.push(tile2_id, tile3_id, tile5_id, tile6_id, tile7_id)
  }else {
    //tile is on the top, no limits
    const tile1_id = (x - 1).toString() + "_" + (y - 1).toString()
    const tile1 = document.getElementById(tile1_id)

    const tile2_id = (x - 1).toString() + "_" + y.toString()
    const tile2 = document.getElementById(tile2_id)

    const tile4_id = x.toString() + "_" + (y - 1).toString()
    const tile4 = document.getElementById(tile4_id)

    const tile7_id = (x + 1).toString() + "_" + y.toString()
    const tile7 = document.getElementById(tile7_id)

    const tile8_id = (x + 1).toString() + "_" + (y - 1).toString()
    const tile8 = document.getElementById(tile8_id)

    tiles_count.push(tile1_id, tile2_id, tile4_id, tile7_id, tile8_id)
  }
  return tiles_count

}

function distance(a,b){
  //gives back the distance between 2 tiles
  if(a > b){
    return a-b
  }else if(b > a){
    return b-a
  }else{
    return 0
  }
}


//making the function which will determine the number displayed on the tile if not mine
//takes in the x and y coords of the tile that is being checked
function count_mines(x, y) {
  console.log("starting the mine counting function")
  const tiles = document.querySelectorAll("tile")

  console.log("mine being counted", x, y)

  x = parseInt(x)
  y = parseInt(y)
  //tiles are aranged like
  // 3 5 6
  // 2 m 7
  // 1 4 8

  //dealing with if the tiles height and width requirements
  //all this code is basically to only get the elements which are rendered and not imaginary ones
  const tiles_count = tilesToCount(x, y)

  console.log("tiles being tested", tiles_count)
  for (let k = 0; k < tiles_count.length; k++) {
    const tile = document.getElementById(tiles_count[k])
    console.log("reading text content of ", tiles_count[k])
    if (tile.classList.contains("mine")) {
    } else {
      if (tile.textContent == "") {
        console.log("this is the mine funciont")
        //if the counter for the current tile is actually at 0
        let num = 1
        tile.textContent = num
      } else {
        let num_str = tile.textContent
        console.log("string number ", num_str)
        let num_int = parseInt(num_str)
        console.log("trying to pass ", num_int)
        tile.textContent = num_int + 1
      }
    }
  }
}

//I am going to attempt to make a function that recursively removes the fake tiles
function explodeTiles(x,y){
  //should recursively show the tiles that are empty that are next to eachother
  console.log("exploding these tiles = " , x, "_" , y)

  //declaring the tiles that is being tested
  const mainTile_id = x + "_" + y


  const mainTile = document.getElementById(mainTile_id)

  if(mainTile.textContent != "" || distance(parseInt(mainTile.id[0]) , parseInt(mainTile.id[2])) < 3 ){
    // the tile is not empty
  }else{
    if (isIn(mainTile_id , checkedTiles)){
      // then it is duplicate
      //do nothing here
    }else{
      // should not be duplicate, gets the go ahead
    console.log("main tile = ", mainTile , mainTile_id)
    console.log(mainTile.classList)
  
    //removing the hidden effect
    mainTile.classList.remove("hidden")
    checkedTiles.push(mainTile.id)
  
    //finding the mines next to the main tile
    let tilesSurrounding = tilesToCount(parseInt(x), parseInt(y))
  
  
    for (let i = 0; i < tilesSurrounding.length; i++){
      console.log("checking this tile:", tilesSurrounding[i])
      console.log("tiles to count = " , tilesSurrounding , "and I = " , i)
   
      
      let tileChecking = document.getElementById(tilesSurrounding[i])
      console.log("checking this tile for existance " , tileChecking , "should be " , tilesSurrounding[i])
      //checking to see if it's a reapeat
      console.log(tileChecking.id, mainTile.id)
      // the tile being checked is empty
      explodeTiles(parseInt(tileChecking.id[0]), parseInt(tileChecking.id[2]), parseInt(mainTile_id[0]), parseInt(mainTile_id[2]))
    
      }
    }
  }  
}

function isIn (elmt, list){
  //returns true if elemt is in an array
  for(let i = 0; i<list.length;i++){
    if (elmt == list[i]){
      return true
    }
  }
  return false
}

//all this stuff happens when the game has already launched, this is the execution section if you will

generateGame(9, 9)

//this adds the numbers to all the mines, this should be done on the first click.
const squares = document.querySelectorAll(".tile")
//"mine maker : ", squares
squares.forEach((tile) => {
  if (tile.classList.contains("mine")) {
    count_mines(tile.id[0], tile.id[2])
  }
})



function show_mines() {
  //func used to display all the mines on the board, often used at lose state.
  const mines = document.querySelectorAll(".mine")
  for (let i = 0; i < mines.length; i++) {
    mines[i].classList.remove("hidden")
  }
}

function lose() {
  //the function that is called if the player loses
  const body = document.querySelector("body")
  body.style["background-color"] = "red"
  show_mines()
  //alert the player that he has lost
}

function add_button(tile) {
  //take a DOM object and add a button to that tile and giving it a function


  tile.addEventListener("click", () => {
    // what happens when you click on a square
    tile.classList.remove("hidden")
     
    //tries to detech first click
    let numTotal = 9*9
    let numTiles = 0
    //counting all the tiles to try and find them all
    const hiddenTiles = document.querySelectorAll(".hidden")
    hiddenTiles.forEach((hidden) => {
      numTiles = numTiles + 1
    })

    if (numTiles == numTotal - 1){
      //the first click has been detected
      let idx = parseInt(tile.id[0])
      let idy = parseInt(tile.id[2])
      firstClick(idx, idy)
    }
    //bit about exploding the tiles
    if (tile.textContent == ""){
      //explode the tile lol
      let idx = parseInt(tile.id[0])
      let idy = parseInt(tile.id[2])
      explodeTiles(parseInt(tile.id[0]), parseInt(tile.id[2]))
    }
    if (tile.textContent == "💣") {
      lose()
    } else {
      check_win()
    }
  })
}

function firstClick(x, y){
  //section about the first click
  console.log("this is the first click")
    addMines(x, y)
}

function check_win() {
  //function played every time a tile is clicked, if conditions are meant than 
  //the player has won.
  const hiddens = document.querySelectorAll(".hidden")
  const mines = document.querySelectorAll(".mine")
  const body = document.querySelector("body")
  let nb_mines = mines.length
  let nb_hidden = hiddens.length
  if (nb_hidden == nb_mines) {
    // if the amount of tiles on the screen that have no been clicked is equal to the amount of mines
    body.style["background-color"] = "green"
    alert("you have won, congrats")
  }
}


