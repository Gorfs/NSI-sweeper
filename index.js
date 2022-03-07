//area where I am going to put my code

//adding all the DOM elements that I am going to target
const game_box = document.querySelector(".game")

//getting the height and width of the game area in pixels
let game_box_width = game_box.clientWidth
let game_box_height = game_box.clientHeight

//calculate how many square I can make
function num_squares(height, width, px) {
  //should return an array with the first elmt being and amount of square on the height and the second being the amount of squares on the width based on the px amount listed
  result = [Math.floor(height / px), Math.floor(width / px)]
  return result
}

function generateGame(height, width, bombs) {
  //should make all the square and append them to the parent elmt
  //the board will be an array of arrays
  if (bombs > height * width) {
    console.log("you have too many bombs for the amount of space you have !!")
    alert("Too many bombs are being generated, aborting")
  }

  //making the identifiying "signature of each square"
  //ici va etre les coordonner que on va devoir utiliser pour le bot
  let x = 0
  let y = 0

  //making the loop that will make all of the columns
  for (let i = 0; i < width; i++) {
    const column = document.createElement("div")
    column.classList.add("column")
    //looping through and making all the square in each column
    for (let j = 0; j < height; j++) {
      const square = document.createElement("div")
      square.classList.add("tile")

      //adding the x y value to the ID of the square
      square.id = String(i, "_", j)

      //adding the square to the column element
      column.push(square)
    }
    //adding the column element to the actual container
    game_box.push(column)
  }
}
