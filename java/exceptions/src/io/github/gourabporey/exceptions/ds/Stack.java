package io.github.gourabporey.exceptions.ds;

import io.github.gourabporey.exceptions.StackOverflowException;
import io.github.gourabporey.exceptions.StackUnderflowException;

public class Stack<T> {
  private final int size;
  private final T[] elements;
  private int top;

  public Stack(int size) {
    this.top = -1;
    this.size = size;
    this.elements = (T[]) new Object[this.size];
  }

  public Stack() {
    this(0);
  }

  public void push(T element) throws StackOverflowException {
    if(this.top >= this.size - 1) {
      throw new StackOverflowException(element);
    }

    this.top++;
    this.elements[this.top] = element;
  }

  public T pop() throws StackUnderflowException {
    if(this.top <= -1) {
      throw new StackUnderflowException();
    }

    T poppedElement = this.elements[this.top];
    this.top--;

    return poppedElement;
  }
}
