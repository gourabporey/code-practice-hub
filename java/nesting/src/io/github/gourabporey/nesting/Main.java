package io.github.gourabporey.nesting;

import java.util.Collection;

public class Main {
  public static void main(String[] args) {
    ApnaMap<String, Integer> map = new ApnaMap<>();

    map.put("gourab", 39529);
    map.put("utsab", 39552);

    Collection<Integer> values = map.values();

    for (Integer val :  values) {
      System.out.println(val);
    }

    System.out.println("------------------------------------");

    for (Integer val : values) {
      map.put("swagato", 39550);
      System.out.println(val);
    }

//    System.out.println(map.get("gourab"));
  }
}
