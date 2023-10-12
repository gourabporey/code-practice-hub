package io.github.gourabporey.math;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MathTest {
  @Test
  void onePlusOneIsTwo() {
    assertEquals(2, Math.add(1, 1));
  }

  @Test
  void sameNumberSubtractionIsZero() {
    assertEquals(0, Math.sub(1, 1));
  }

  @Test
  void multiplyTest() {
    double a = 5;
    double b = 2;
    assertEquals(10, a * b);
  }

  @Nested
  @DisplayName("Math.factorial")
  class Factorial {
    @ParameterizedTest
    @ValueSource(ints = {0, 1})
    void factorialOfNumberLessThanTwoIsOne(int num) {
      assertEquals(1, Math.factorial(num));
    }

    @Test
    void factorialOfFiveIsOneHundredTwenty() {
      assertEquals(120, Math.factorial(5));
    }
  }
}