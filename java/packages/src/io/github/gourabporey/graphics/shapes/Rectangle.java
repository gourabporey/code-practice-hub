package io.github.gourabporey.graphics.shapes;

public class Rectangle {
  private double length;
  private double bredth;

  public Rectangle(double length, double bredth) {
    this.length = length;
    this.bredth = bredth;
  }

  public double area() {
    return this.length * this.bredth;
  }
}