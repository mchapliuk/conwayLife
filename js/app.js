document.addEventListener('DOMContentLoaded', () => {
  const INNER_PADDING = 15; // px
  const infoLabel = document.getElementById('infoLabel');

  let CELL_SIZE = 10; // default, pixels
  let CANVAS_WIDTH;
  let CANVAS_HEIGHT;
  let UNIVERSE_WIDTH;
  let UNIVERSE_HEIGHT;

  let process;
  let isFullSize = true;
  let lifeCore;
  let universe;

  let inProgress;
  let paused;
  let init;

  const btnRun = document.getElementById('run');
  const btnStop = document.getElementById('stop');
  const btnReset = document.getElementById('reset');
  const lblGenerationNum = document.querySelector('[data-life="generationNum"]');

  (init = function(isFullSize = true) {
    btnRun.disabled = false;
    btnStop.disabled = true;
    btnReset.disabled = false;
    lblGenerationNum.innerText = 0;

    const winWidth = window.outerWidth - INNER_PADDING * 2;
    const winHeight = window.innerHeight - INNER_PADDING * 2;

    if (winWidth < 400) {
      CELL_SIZE = 20;
    }

    const headerHeight = document.getElementById('header').offsetHeight;
    const footerHeight = document.getElementById('footer').scrollHeight;
    const viewHeight = winHeight - headerHeight - footerHeight;
    const fieldEl = document.getElementById('field');
    fieldEl.innerHTML = '';

    CANVAS_WIDTH = winWidth - (winWidth % CELL_SIZE); // pixels
    CANVAS_HEIGHT = viewHeight - (viewHeight % CELL_SIZE); // pixels

    UNIVERSE_WIDTH = Math.ceil(CANVAS_WIDTH / CELL_SIZE); // cells
    UNIVERSE_HEIGHT = Math.ceil(CANVAS_HEIGHT / CELL_SIZE); // cells

    // Init universe
    lifeCore = new Life({
      width: UNIVERSE_WIDTH,
      height: UNIVERSE_HEIGHT
    });

    universe = new UniverseUI({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      universeWidth: UNIVERSE_WIDTH,
      universeHeight: UNIVERSE_HEIGHT,
      cellSize: CELL_SIZE
    }, fieldEl, lifeCore);
  })();

  btnReset.addEventListener('click', () => {
    clearInterval(process);
    init(isFullSize);
  });

  btnRun.addEventListener('click', () => {
    process = setInterval(() => {
      lifeCore.next();
      universe.render(lifeCore);
      lblGenerationNum.innerText = lifeCore.generationNum;
    }, 600);

    btnStop.disabled = false;
    btnRun.disabled = true;
  });

  btnStop.addEventListener('click', () => {
    clearInterval(process);
    btnRun.disabled = false;
    btnStop.disabled = true;
  });

  let radios = document.querySelectorAll('[name="fieldSize"]');
  for (let key in radios) {
    if (radios.hasOwnProperty(key)) {
      radios[key].addEventListener('change', () => {
        this.value === 'fullSize' ? isFullSize = true : isFullSize = false;
      });
    }
  }
});
