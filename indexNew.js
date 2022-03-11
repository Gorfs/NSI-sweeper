// this is the new JS file for the NSI sweeper project.
// this rewrite is to try and make the old code cleaner and thus more readable for when I have to present this thing
//All code shown here is property of Archie Beales

//this is the intro section, here is code made to make sure that the file is not corrupt
console.log("Hello there, my name is indexNew.JS")

//declaration of all the things I need to start the functions
const game_box = document.querySelector(".game")
//the height and width of the minesweeper game in the number of tiles
//for now the game will be locked at 9x9 squares
const game_box_width = 9
const game_box_height = 9
//The probability that mines will spawn
const mine_proba = 6

//Here will be the functions for when a player wins and loses the game
function win(){
    body.style["background-color"] = "green"
    alert("you have won, congrats")
    //need to put in place a timer that will end here:

    //extra styles for the lost need to go here:
}

function lose(){
    body.style["background-color"] = "red"
    alert("you have lost")
    //need to put in place a timer that will end here:

    //extra styles for the win need to go here:
}

//HERE are the functions used for generating the game, the number, the mines etc....--------------

function generateGame(){
    console.log("Generating the game now...")
    //the loop that makes the columns
    for (let i = 1; i < width + 1; i++) {

        //makes the column div
        const column = document.createElement("div")
        column.classList.add("column")

        //looping and adding square to the column
        for (let j = 1; j < height + 1; j++) {

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
    
      //this little snippet adds the button to each of the tiles making it possible to click them
      const squares = document.querySelectorAll(".tile")
      const hidden = document.querySelectorAll(".hidden")
      squares.forEach((tile) => {
        //looping for adding the buttons to the tiles to make it clickable
        tile.addEventListener("click" , () => {
            tile.classList.remove("hidden")
            //the number of tiles total
            let numTiles = game_box_height * game_box_width

            if (hidden.length == numTiles - 1){
              //the first click has been detected
              let idx = parseInt(tile.id[0])
              let idy = parseInt(tile.id[2])
              addMines(idx, idy)
            }
        })
      })
    }

}