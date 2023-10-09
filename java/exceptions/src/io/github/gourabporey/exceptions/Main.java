package io.github.gourabporey.exceptions;

import io.github.gourabporey.exceptions.ds.LinkedList;

public class Main {
  public static void main(String[] args) {
    LinkedList<Number> linkedList = new LinkedList<>();

    linkedList.add(5);
    linkedList.add(1);
    linkedList.add(2);

    System.out.println(linkedList);
  }
}
