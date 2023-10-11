package io.github.gourabporey.collections;

import java.util.HashMap;
import java.util.Map;

public class FrequencyCounter {
  public static Map<String, Map<Character, Integer>> cachedCharFrequencies = new HashMap<>();

  public static void main(String[] args) {
    String paragraph = "This is a line. This is another line.";
    Map<Character, Integer> charCount = calculateFrequency(paragraph);

    Map<Character, Double> frequencyPercentage = calculateFrequencyPercentage(paragraph);

    System.out.println(frequencyPercentage);
  }

  public static Double calculatePercentage(Number part, Number whole) {
    return part.doubleValue() / whole.doubleValue() * 100;
  }

  private static Map<Character, Double> calculateFrequencyPercentage(String paragraph) {
    int totalCharCount = paragraph.length();
    Map<Character, Integer> frequencies = calculateFrequency(paragraph);
    HashMap<Character, Double> frequencyPercentages = new HashMap<>();

    for (Character character : frequencies.keySet()) {
      Integer frequency = frequencies.get(character);
      Double frequencyPercentage = calculatePercentage(frequency, totalCharCount);
      frequencyPercentages.put(character, frequencyPercentage);
    }

    return frequencyPercentages;
  }

  private static Map<Character, Integer> calculateFrequency(String paragraph) {
    if (cachedCharFrequencies.containsKey(paragraph)) return cachedCharFrequencies.get(paragraph);

    Map<Character, Integer> frequencies = new HashMap<>(26);

    for (char character : paragraph.toLowerCase().toCharArray()) {
      Integer charCount = frequencies.getOrDefault(character, 0);
      frequencies.put(character, charCount + 1);
    }

    cachedCharFrequencies.put(paragraph, frequencies);

    return frequencies;
  }
}
