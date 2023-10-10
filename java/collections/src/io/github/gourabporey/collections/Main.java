package io.github.gourabporey.collections;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Main {
  public static void main(String[] args) {
    Set<Intern> interns = new HashSet<>();

    Intern gourab2 = new Intern("gourab2", 22);
    Intern gourab = new Intern("gourab", 22);
    Intern sourov = new Intern("sourov", 22);
    Intern utsab = new Intern("utsab", 22);

    interns.add(gourab2);
    interns.add(gourab);
    interns.add(sourov);
    interns.add(utsab);

    System.out.println(interns);
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
