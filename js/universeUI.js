const NS = "http://www.w3.org/2000/svg";

class UniverseUI {
  constructor(options, parentEl, life) {
    this.width = options.width;
    this.height = options.height;
    this.uWidth = options.universeWidth;
    this.uHeight = options.universeHeight;
    this.cellSize = options.cellSize;
    this.life = life;

    this.parentEl = parentEl;

    this._init();
  }

  _init() {
    // Create SVG context
    this.canvas = document.createElementNS(NS, 'svg');
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.canvas.setAttribute('stroke', 'blue');

    // fill in with cells
    for (let i = 0; i < this.uWidth; i++) {
      for (let j = 0; j < this.uHeight; j++) {
        let cell = document.createElementNS(NS, 'rect');
        cell.setAttribute('x', i * this.cellSize);
        cell.setAttribute('y', j * this.cellSize);
        cell.setAttribute('uX', i);
        cell.setAttribute('uY', j);
        cell.setAttribute('width', this.cellSize);
        cell.setAttribute('height', this.cellSize);

        cell.classList.add('cell');
        cell.classList.add('dead');

        cell.addEventListener('click', (e) => {
          this._toggleCell(e.target);
        });

        this.canvas.appendChild(cell);
      }
    }

    this.parentEl.appendChild(this.canvas);
  }

  render(universe) {
    let cells = this.canvas.children;
    const len = cells.length;
    let cell;
    for (let i = 0; i < len; i++) {
      cell = cells[i];
      let x = cell.getAttribute('uX');
      let y = cell.getAttribute('uY');
      let cellState = universe.getCellState(x, y);
      this._setCellState(cell, cellState);
    };
  }

  reset() {
    console.info('Univrese Reset');
    this.render(this.life);
  }

  /**
   * Toggles Cell state
   * @param {Object} cell Instance of cell
   * @private
   */
  _toggleCell(cell) {
    const x = cell.getAttribute('uX');
    const y = cell.getAttribute('uY');

    this.life.toggleCell(x, y);
    const cellState = this.life.getCellState(x, y);
    this._setCellState(cell, cellState);
  }

  _setCellState(cell, isAlive) {
    if (isAlive) {
      cell.classList.remove('dead');
      cell.classList.add('alive');
    } else {
      cell.classList.remove('alive');
      cell.classList.add('dead');
    }
  }
}
