export default class View {
  constructor(rows, cols) {
    this.ROWS = rows;
    this.COLS = cols;


    this.gridDOM = new Array(this.ROWS);
  }

  controls = {
    startButton : document.querySelector('#start')
  }

  initializeGrids = () => {
    for (let i = 0; i < this.ROWS; i++) {
        this.gridDOM[i] = new Array(this.COLS);
    }
  }

  createTable = () => {
    const gridContainer = document.querySelector('#gridContainer');
    const table = document.createElement("table");

    
    for (let i = 0; i < this.ROWS; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < this.COLS; j++) {
            const cell = document.createElement("td");
            this.gridDOM[i][j] = cell;
            cell.setAttribute("id", `_${ i }_${ j }`);
            cell.dataset.i = i;
            cell.dataset.j = j;
            cell.setAttribute("class", "dead");
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
  }

  updateTextStart = (isPlaying) => {
    this.controls.startButton.textContent = isPlaying ? 'Stop' : "Continue";
  }

  restartText = () => {
    this.controls.startButton.textContent = 'Start';
  }

  updateView = (grid) => {
    for (let i = 0; i < this.ROWS; i++) {
        for (let j = 0; j < this.COLS; j++) {
            this.gridDOM[i][j].setAttribute("class", grid[i][j] ? 'live' : 'dead');
        }
    }
  }
}