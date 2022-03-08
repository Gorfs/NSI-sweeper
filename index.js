//area where I am going to put my code

//adding all the DOM elements that I am going to target
const game_box = document.querySelector(".game")

//getting the height and width of the game area in pixels
let game_box_width = game_box.clientWidth
let game_box_height = game_box.clientHeight

//the size of each tile in pixels\
//declares in let as it can be changed futher on
let tile_pixel_size = 50

//calculate how many square I can make
function num_squares(height, width, px) {
  //should return an array with the first elmt being and amount of square on the height and the second being the amount of squares on the width based on the px amount listed
  result = [Math.floor(height / px), Math.floor(width / px)]
  return result
}

function generateGame(height, width) {
  //should make all the square and append them to the parent elmt

  //making the identifiying "signature of each square"
  //ici va etre les coordonner que on va devoir utiliser pour le bot
  let x = 0
  let y = 0

  //making a variable for how many bombs are currently on the board
  let bombsOnBoard = 0

  //making the loop that will make all of the columns
  for (let i = 0; i < width; i++) {
    const column = document.createElement("div")
    column.classList.add("column")
    //looping through and making all the square in each column
    for (let j = 0; j < height; j++) {
      //making each of the squares that will be appended to the column element
      const square = document.createElement("div")
      square.classList.add("tile")

      //adding the x y value to the ID of the square
      square.id = String(i, "_", j)

      //adding the square to the column element
      column.appendChild(square)
    }
    //adding the column element to the actual container
    game_box.appendChild(column)
  }

  //Here needs to be an algorithme to distribute the bombs among the tiles
  const squares = document.querySelectorAll(".tile")
  squares.forEach(tile, () => {
    random_num = Math.round(Math.random * 6)
    if (random_num == 1) {
      tile.ClassList.add("mine")
    }
  })
}


//making the function which will determine the number displayed on the tile if not mine
//takes in the x and y coords of the tile that is being checked
function count_mines(x, y) {
  //making the string for the value of the id
  let id_main = "#" + x.toString + "_" + y.toString
  const checked_tile = document.querySelector(id)

  // the array that will hold all the cubes to actually be checked
  let tiles = []

  //checking to see if the main boi has a mine
  if (checked_tile.classList.includes("mine") == true) {
    //if the mine is the main tile than it returns mine
    return "mine"
  }
  if (x == game_box_width / tile_pixel_size) {
    //the tile is on the right of the screen
    if (y == game_box_height / tile_pixel_size) {
      //the tile is on the top and the right
      let id_1 = "#" + (x - 1).toString + "_" + (y - 1).toString
      const tile_1 = document.querySelector(id_1)

      let id_2 = "#" + (x - 1).toString + "_" + y.toString
      const tile_2 = document.querySelector(id_2)

      let id_4 = "#" + x.toString + "_" + (y - 1).toString
      const tile_4 = document.querySelector(id_4)

      //gives back the tiles that will be checked
      tiles = [tile_1, tile_1, tile_4]

    } else if (y == 0) {
      //the tile is on the bottom and right

      let id_2 = "#" + (x - 1).toString + "_" + y.toString
      const tile_2 = document.querySelector(id_2)

      let id_3 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_3 = document.querySelector(id_3)

      let id_5 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_5 = document.querySelector(id_5)
    
      tiles = [tile_2, tile_3, tile_5]

    } else {
      //the tile is on the right but not top of bottom
      let id_1 = "#" + (x - 1).toString + "_" + (y - 1).toString
      const tile_1 = document.querySelector(id_1)

      let id_2 = "#" + (x - 1).toString + "_" + y.toString
      const tile_2 = document.querySelector(id_2)

      let id_3 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_3 = document.querySelector(id_3)

      let id_4 = "#" + x.toString + "_" + (y - 1).toString
      const tile_4 = document.querySelector(id_4)

      let id_5 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_5 = document.querySelector(id_5)
    
      tiles = [tile_1, tile_2, tile_3, tile_4, tile_5]
    }
  }
  if (x == 0) {
    //the tile is on the left of the screen
    if (y == game_box_height / tile_pixel_size) {
      //the tile is on the top and the left
      let id_4 = "#" + x.toString + "_" + (y - 1).toString
      const tile_4 = document.querySelector(id_4)

      let id_7 = "#" + (x + 1).toString + "_" + y.toString
      const tile_7 = document.querySelector(id_7)

      let id_8 = "#" + (x + 1).toString + "_" + (y - 1).toString
      const tile_8 = document.querySelector(id_8)

      tiles = [tile_4, tile_7, tile_8]
      

    } else if (y == 0) {
      //the tile is on the bottom and left

      let id_5 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_5 = document.querySelector(id_5)

      let id_6 = "#" + (x + 1).toString + "_" + (y + 1).toString
      const tile_6 = document.querySelector(id_6)

      let id_7 = "#" + (x + 1).toString + "_" + y.toString
      const tile_7 = document.querySelector(id_7)

      tiles = [tile_5, tile_6, tile_7]

    } else {
      //the tile is on the left but not on a top or bottom bit
      let id_4 = "#" + x.toString + "_" + (y - 1).toString
      const tile_4 = document.querySelector(id_4)

      let id_5 = "#" + (x - 1).toString + "_" + (y + 1).toString
      const tile_5 = document.querySelector(id_5)

      let id_6 = "#" + (x + 1).toString + "_" + (y + 1).toString
      const tile_6 = document.querySelector(id_6)

      let id_7 = "#" + (x + 1).toString + "_" + y.toString
      const tile_7 = document.querySelector(id_7)

      let id_8 = "#" + (x + 1).toString + "_" + (y - 1).toString
      const tile_8 = document.querySelector(id_8)

      tiles = [tile_4, tile_6, tile_7, tile_8]
      
    }
  }
  
  //makign the counting algorithme
  let count = 0
  for (let i = 0; i < tiles.length; i++){
    if (tiles[i].classList.includes("mine")) {
      count = count + 1
    }
  return count
  }
