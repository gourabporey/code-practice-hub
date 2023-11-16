package com.step.tw.kotlin

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class CalculatorTest {
  @Nested
  inner class SumTest {
    @Test
    fun shouldAddTwoNumbers() {
      assertEquals(5, Calculator.add(2, 3))
    }
  }

  @Nested
  inner class DivisionTest {
    @Test
    fun `Should throw an exception while dividing by 0`() {
      assertThrows<DivideByZeroException> { Calculator.divide(5, 0) }
    }
  }
}
