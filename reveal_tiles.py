coordinates = []

def reveales_tiles(grid, x_coor, y_coor):
  """
  grid: grid for the python testing
  x_coor: int of the x coor where the player clicked
  y_coor: int of the y coor where the player clicked
  return: list of formatted coordinates of all tiles to reveal
  """
  # note: y and x coor are sometimes switched since the grid is like : grid[y_coor=row][x_coor=columns]
  global coordinates
  coordinates.append(str(x_coor) + "_" + str(y_coor)) # puts the tile in already checked coordinates

  tiles_around = [(y_coor-1, x_coor), # coord of tiles around it clockwise
                (y_coor-1, x_coor+1),
                (y_coor, x_coor+1),
                (y_coor+1, x_coor+1),
                (y_coor+1, x_coor),
                (y_coor+1, x_coor-1),
                (y_coor, x_coor-1),
                (y_coor-1, x_coor-1)]
  tiles_around = [str(tile[1]) + "_" + str(tile[0]) for tile in tiles_around if tile[0] >= 0 and tile[0] < len(grid) and tile[1] >= 0 and tile[1] < len(grid)] # formats archie's way
  for tiles in tiles_around:
    if tiles not in coordinates: # tests if not checked already
      if grid[int(tiles[2])][int(tiles[0])] == 0: # checks if the tile is a zero (empty)
        reveales_tiles(grid, int(tiles[0]), int(tiles[2])) # recursive process
      else:
        coordinates.append(tiles) # else, appends that tile so it is not checked again
  
  print(coordinates) # i didn't find a way to just get the last list so gl with that

grid = [[1,1,1,1],
[1,0,0,1],
[1,0,0,1],
[1,0,1,1]]

grid2 = [[2,3,6,1,1,1,1,1],
      [1,1,1,1,2,3,1,1],
      [2,3,0,0,0,0,3,2],
      [0,0,0,0,2,3,2,1],
      [6,2,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,2],
      [2,2,2,2,3,1,0,1],
      [1,1,1,1,1,1,1,1]]

# x and y coor are where the player clicked
print(reveales_tiles(grid2, 5,1))