package io.github.gourabporey.exceptions.ds;

public class LinkedList<T> {
  private Node<T> head;
  private Node<T> tail;

  public void add(T elem) {
    Node<T> current = new Node<>(elem, null);

    if(this.head == null) {
      this.head = current;
      this.tail = current;
      return;
    }

    this.tail.setNext(current);
    this.tail = current;
  }

  @Override
  public String toString() {
    String listString = "LinkedList: ";
    Node<T> node = this.head;

    while(node != null) {
      listString += "->" + node.getData();
      node = node.getNext();
    }

    return listString;
  }
}
