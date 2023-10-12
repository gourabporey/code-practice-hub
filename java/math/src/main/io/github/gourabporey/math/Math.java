package io.github.gourabporey.math;

public class Math {
  public static double add(double a, double b) {
    return a + b;
  }

  public static double sub(double a, double b) {
    return a - b;
  }

  public static int factorial(int number) {
    if (number <= 1) return 1;
    return number * factorial(number - 1);
  }
}