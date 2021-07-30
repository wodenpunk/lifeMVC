import Model from "./model.js";
import View from "./view.js";

export default class Controller {
  ROWS = 10;
  COLS = 10;

  REPRODUCTION_TIME = 100;

  timer;


  constructor() {
    this.view = new View(this.ROWS, this.COLS);
    this.model = new Model(this.ROWS, this.COLS);

    
    this.model.initializeGrids();
    this.view.initializeGrids();
    this.view.createTable();
    this.model.resetGrids();
    this.setupControlButtons();
  }

  
// handle click cell
cellClickHandler = (event) => {
  const { i, j } = event.target.dataset;

  this.model.toggleCell(i, j);

  this.view.updateView(this.model.grid);
}

//update View

//add listeners to buttons
setupControlButtons = () => {
  // button to start
  this.view.controls.startButton.addEventListener('click', this.startButtonHandler);
  
  // button to clear
  document.querySelector('#clear').addEventListener('click', this.clearButtonHandler);

  // button to set random initial state
  document.querySelector('#random').addEventListener('click', this.randomButtonHandler);

  for (let i = 0; i < this.ROWS; i++) {
    for (let j = 0; j < this.COLS; j++) {
        const cell = this.view.gridDOM[i][j];
        cell.addEventListener('click', this.cellClickHandler);
    }
}
}

// clear the grid
clearButtonHandler = () => {
  
  this.model.pause();
  this.view.restartText();
  clearTimeout(this.timer);
  

  this.model.resetGrids();

  this.view.updateView(this.model.grid);
}

//generate random life cells
randomButtonHandler = () => {
  if (this.model.isPlaying) return;

  this.clearButtonHandler();

  this.model.randomizeGrid();
  this.view.updateView(this.model.grid);
}

// start/pause/continue the game
startButtonHandler = () => {
  this.model.togglePlay();

  this.view.updateTextStart(this.model.isPlaying);

  if (!this.model.isPlaying) {
      clearTimeout(this.timer);
  } else {
      this.play();
  }


}


// run the life game
play = () => {
  this.model.computeNextGen();
  this.view.updateView(this.model.grid);
  
  if (this.model.isPlaying) {
      this.timer = setTimeout(this.play, this.REPRODUCTION_TIME);
  }
}


}