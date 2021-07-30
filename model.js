export default class Model {
  isPlaying = false;

  constructor(rows, cols) {
    this.ROWS = rows;
    this.COLS = cols;

    this.grid = new Array(this.ROWS);
    this.nextGrid = new Array(this.ROWS);
  }

  applyRules = (row, col) => {
    const numNeighbors = this.countNeighbors(row, col);

    if (numNeighbors < 2 || numNeighbors > 3) {
        this.nextGrid[row][col] = 0;
        return;
    }

    if (numNeighbors == 3) {
        this.nextGrid[row][col] = 1;
        return;
    }

    if(this.grid[row][col] == 1 && numNeighbors == 2){
        this.nextGrid[row][col] = 1;
    }
  }

  checkNeighbour = (row, col) =>{
    if(row - 1 < 0 
        || col - 1 < 0
        || col + 1 > this.COLS
        || row + 1 > this.ROWS) return 0;

    return this.grid[row][col];
  }

// return count of neighbours
countNeighbors = (row, col)  =>{
    let count = 0;

    count += this.checkNeighbour(row - 1, col - 1);
    count += this.checkNeighbour(row - 1, col);
    count += this.checkNeighbour(row - 1, col + 1);
    count += this.checkNeighbour(row, col - 1);
    count += this.checkNeighbour(row, col + 1);
    count += this.checkNeighbour(row + 1, col - 1);
    count += this.checkNeighbour(row + 1, col);
    count += this.checkNeighbour(row + 1, col + 1);
    
    return count;
}

toggleCell = (i, j) => {
  const lifeStatus = (this.grid[i][j] + 1) % 2;
  this.grid[i][j] = lifeStatus;
}

randomizeGrid = () => {
  for (let i = 0; i < this.ROWS; i++) {
    for (let j = 0; j < this.COLS; j++) {
        const isLive = Math.round(Math.random());
        this.grid[i][j] = isLive;
    }
  }
}

pause = () => {
  this.isPlaying = false;
}

play = () => {
  this.isPlaying = true;
}

togglePlay = () => {
  this.isPlaying = !this.isPlaying;
}

//initialize 3 arrays this.ROWS * this.COLS
initializeGrids = () => {
  for (let i = 0; i < this.ROWS; i++) {
      this.grid[i] = new Array(this.COLS);
      this.nextGrid[i] = new Array(this.COLS);
  }
}

//set elements of 2 arrays to 0
resetGrids = () => {
  for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
          this.grid[i][j] = 0;
          this.nextGrid[i][j] = 0;
      }
  }
}

//set next generation
copyAndResetGrid = () => {
  for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
          this.grid[i][j] = this.nextGrid[i][j];
          this.nextGrid[i][j] = 0;
      }
  }
}

 computeNextGen = () => {
    for (let i = 0; i < this.ROWS; i++) {
        for (let j = 0; j < this.COLS; j++) {
            this.applyRules(i, j);
        }
    }

    // copy NextGrid to this.grid, and reset this.nextGrid
    this.copyAndResetGrid();
    // copy all 1 values to "live" in the table
    // updateView();
  }

}