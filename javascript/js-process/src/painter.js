const QUIT = 'q';
const DRAW = 'c';
const ERASE = "e";

class Painter {
   constructor(io, coordinate) {
      this.io = io;
      this.coordinate = coordinate;
      this.shouldPaint = false;
      this.shouldErase = false;
   }

   toggleBrush() {
      this.shouldPaint = !this.shouldPaint;
   }

   toggleEraser() {
      this.shouldErase = !this.shouldErase;
   }

   putPixel(move) {
      const { x, y } = this.coordinate;

      const drawOnValidMove = () => {
         if (['j', 'k', 'l', 'h'].includes(move))
            this.io.stdout.write('֍');
      }

      this.io.stdout.cursorTo(x, y, drawOnValidMove);
   }

   updateCursorCoordinate(data) {
      switch (data) {
         case 'j': this.coordinate.y += 1;
            break;
         case 'k': this.coordinate.y -= 1;
            break;
         case 'l': this.coordinate.x += 2;
            break;
         case 'h': this.coordinate.x -= 2;
            break;
      }
   }

   erase(move) {
      const { x, y } = this.coordinate;

      const putPixel = () => {
         if (['j', 'k', 'l', 'h'].includes(move))
            this.io.stdout.write(' ');
      }

      this.io.stdout.cursorTo(x, y, putPixel);
   }

   draw() {
      const inputStream = this.io.stdin.setRawMode(true);
      inputStream.setEncoding('utf8');
      console.clear();

      inputStream.on('data', (data) => {
         if (data === QUIT) inputStream.destroy();
         if (data === DRAW) this.toggleBrush();
         if (data === ERASE) this.toggleEraser();

         this.updateCursorCoordinate(data);

         if (this.shouldPaint) this.putPixel(data);
         if (this.shouldErase) this.erase(data);

         if (inputStream._readableState.destroyed) console.log('ended')
      });
   }
}

exports.Painter = Painter;