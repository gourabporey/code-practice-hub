class Position {
   #x
   #y
   constructor(x, y) {
      this.#x = x;
      this.#y = y;
   }

   getPoint() {
      return [this.#x, this.#y];
   }

   leftOf() {
      return new Position(this.#x - 1, this.#y);
   }

   rightOf() {
      return new Position(this.#x, this.#y - 1);
   }
}

class Cursor {
   #position
   #icon
   constructor(position) {
      this.#position = position;
      this.#icon = "A";
   }

   moveLeft() {
      this.#position = this.#position.leftOf();
   }

   moveRight() {
      this.#position = this.#position.rightOf();
   }

   changeIcon(newIcon) {
      this.#icon = newIcon;
   }

   draw(screen) {
      const [x, y] = this.#position.getPoint();
      screen.put(x, y, this.#icon);
   }
}

class Screen {
   #pixels
   constructor(pixels) {
      this.#pixels = pixels;
      this.#overlay = pixels.map(x=>x.slice());
   }

   put(x, y, glyph) {
      this.#pixels[y][x] = glyph;
   }

   overlay(x,y,glyph) {

   }

   render() {
      return this.#pixels.map(r => r.join("")).join("\n");
   }
}


const main = () => {
   const pixels = new Array(10).fill(0).map(x => new Array(10).fill(" "));
   const screen = new Screen(pixels);
   const cursor = new Cursor(new Position(5, 5));
   cursor.draw(screen);

   console.log(screen.render());
}

main();