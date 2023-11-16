package com.step.tw.kotlin

class Calculator {
  companion object {
    fun add(num1: Int, num2: Int) = num1 + num2
    fun divide(dividend: Int, divisor: Int): Double {
      if(divisor == 0) throw DivideByZeroException("Divisor should not be 0")
      return (dividend / divisor).toDouble()
    }
  }
}
