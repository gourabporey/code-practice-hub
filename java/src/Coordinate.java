class Coordinate {
  private int x;
  private int y;

  Coordinate() {
    this(0, 0);
  }

  Coordinate(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public String toString() {
    return this.x + "," + this.y;
  }
}