class Life {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    
    this._init();
  }

  _init() {
    let u = this.universe = [];
    for (let i = 0; i < this.width; i++) {
      u[i] = [];
      for (let j = 0; j < this.height; j++) {
        u[i][j] = false;
      }
    }
    this.isAllDead = true;
  }

  _initTemporayUniverse() {
    let un = this.universeStep = [];
    for (let i = 0; i < this.width; i++) {
      un[i] = [];
      for (let j = 0; j < this.height; j++) {
        un[i][j] = false;
      }
    }
  }

  toggleCell(x, y) {
    this.universe[x][y] = !this.universe[x][y];
  }

  getCellState(x, y) {
    return this.universe[x][y];
  }

  reset() {
    console.info('Core Reset');
    this._init();
  }

  next() {
    var self = this;
    this._initTemporayUniverse();

    function countAliveNeighbors(i, j, w, h) {
      const u = self.universe;
      let count = 0;
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (k >= 0 && k < w && l >= 0 && l < h && !(k === i && l === j)) {
            if (u[k][l]) count++;
          }
        }
      }
      return count;
    }

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let cell = this.universe[i][j];
        const count = countAliveNeighbors(i, j, this.width, this.height);
        if (cell) {
          // if cell alive
          if (count < 2 || count > 3) {
            cell = !cell;
          }
        } else {
          // if cell dead
          if (count === 3) {
            cell = !cell;
          }
        }
        this.universeStep[i][j] = cell;
      }
    }

    // copy tmp universe into main universe
    this.universe = this.universeStep.slice();
  }
}
