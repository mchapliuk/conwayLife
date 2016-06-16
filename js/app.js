document.addEventListener('DOMContentLoaded', () => {
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const CELL_SIZE = 10;
  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 300;

  const UNIVERSE_WIDTH = Math.ceil(CANVAS_WIDTH/CELL_SIZE);
  const UNIVERSE_HEIGHT = Math.ceil(CANVAS_HEIGHT/CELL_SIZE);

  const fieldHeight = winHeight - 100 - 100; // minus Header's height, minus Footer's height

  // Init universe
  let lifeCore = new Life({
    width: UNIVERSE_WIDTH,
    height: UNIVERSE_HEIGHT
  });

  let universe = new UniverseUI({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    universeWidth: UNIVERSE_WIDTH,
    universeHeight: UNIVERSE_HEIGHT,
    cellSize: CELL_SIZE
  }, document.getElementById('field'), lifeCore);

  document.getElementById('reset').addEventListener('click', () => {
    lifeCore.reset();
    universe.reset();
  });

  document.getElementById('run').addEventListener('click', () => {
    lifeCore.next();
    universe.render(lifeCore);
  });
});
