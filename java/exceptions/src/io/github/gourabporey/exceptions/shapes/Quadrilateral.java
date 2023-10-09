package io.github.gourabporey.exceptions.shapes;

public class Quadrilateral implements Shape {
  private final double a;
  private final double b;
  private final double c;
  private final double d;

  public Quadrilateral(double a, double b, double c, double d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  @Override
  public double getArea() {
    return a * b * c * d;
  }
}
