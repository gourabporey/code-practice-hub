package io.github.gourabporey.nesting;

import java.util.Collection;

public class Main {
  public static void main(String[] args) {
    ApnaMap<String, Integer> map = new ApnaMap<>();

    map.put("gourab", 39529);
    map.put("utsab", 39552);

    Collection<Integer> values = map.values();
    printList(values);

    printSeparator();

    map.put("swagato", 39550);
    printList(values);
  }

  private static void printSeparator() {
    System.out.println("x-".repeat(10));
  }

  private static <T> void printList(Collection<T> values) {
    for (T val : values) {
      System.out.println(val);
    }
  }
}
