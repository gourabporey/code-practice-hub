package io.github.gourabporey.collections;

import java.util.*;

public class Main {
  public static <T> Set<T> createSet(T... elements) {
    Set<T> set = new HashSet<>();
    Collections.addAll(set, elements);

    return set;
  }

  public static void main(String[] args) {
    Map<String, Intern> interns = new HashMap<>();

    Intern gourab = new Intern("gourab", 22);
    Intern sourov = new Intern("sourov", 23);
    Intern utsab = new Intern("utsab", 24);

    interns.put("gourab", gourab);
    interns.put("sourov", sourov);
    interns.put("utsab", utsab);

//    System.out.println(interns.containsValue(gourab));

//    System.out.println(interns);
    performHashsetOperations(gourab, sourov, utsab);
  }

  private static void performHashsetOperations(Intern... interns) {
    Set<Intern> internsSet = createSet(interns);

    List<Intern> internsList = new ArrayList<>(internsSet);
    System.out.println(internsList);

    internsList.sort(Comparator.comparingInt(i -> i.age));

    System.out.println(internsList);
  }

  private static void performStringListOperation(List<String> strings) {
    System.out.println(strings.size());

    List<String> strs = new LinkedList<>();

    strs.add("milan");
    strs.add("qasim");
    strs.add("sourov");
    strs.add("gourab");

    strings.add("gourab");
    strings.add(0, "sourov");
    strings.remove("gourab");
    strings.retainAll(strs);

    // TODO: Write a shuffle method that takes a list and a randomizer and returns a randomized list

    System.out.println(strings);
  }

  private static void performIntegerListOperation(List<Integer> numbers) {
    numbers.add(5);

    numbers.addAll(numbers);

    System.out.println(numbers);
  }

  private static double average(List<? extends Number> numbers) {
    double sum = 0;

    for (Number number : numbers) {
      sum += number.doubleValue();
    }

    return sum / numbers.size();
  }
}
