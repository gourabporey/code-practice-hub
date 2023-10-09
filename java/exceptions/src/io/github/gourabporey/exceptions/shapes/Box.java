package io.github.gourabporey.exceptions.shapes;

public class Box<T extends Shape> {
  private final T[] items;
  private int lastItemIndex;

  public Box(int size) {
    this.items = (T[]) new Object[size];
    this.lastItemIndex = -1;
  }

  public void addItem(T item) {
    this.lastItemIndex++;
    this.items[this.lastItemIndex] = item;
  }
}
