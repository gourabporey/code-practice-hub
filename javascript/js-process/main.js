const { Painter } = require('./src/painter');

const main = () => {
   const painter = new Painter(process, { x: 0, y: 0 });
   // const keyHandler = new KeyHandler(process);

   // keyHandler.handle('j', () => painter.down())
   // keyHandler.handle('k', () => painter.up())

   painter.draw();
}

main();