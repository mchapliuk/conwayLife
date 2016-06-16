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

    function getNeighbors(i, j, w, h) {
      const u = self.universe;
      let res = []
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (k >= 0 && k < w && l >= 0 && l < h && !(k === i && l === j)) {
            res.push(u[k][l]);
          }
        }
      }
      return res;
    }

    function countAliveNeighbors(neighborsList) {
      let count = 0;
      neighborsList.forEach(cell => {
        if (cell) count++;
      });
      return count;
    }

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let cell = this.universe[i][j];
        let neighbors = getNeighbors(i, j, this.width, this.height);
        const count = countAliveNeighbors(neighbors);
        if (cell) {
          // if cell alive
          if (count < 2 || count > 3) {
            this.universeStep[i][j] = !cell;
          } else {
            this.universeStep[i][j] = cell;
          }
        } else {
          // if cell dead
          if (count === 3) {
            this.universeStep[i][j] = !cell;
          } else {
            this.universeStep[i][j] = cell;
          }
        }
      }
    }

    // copy tmp universe into main universe
    this.universe = this.universeStep.slice();
  }
}
