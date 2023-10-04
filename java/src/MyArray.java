import java.util.Arrays;

class MyArray {
  public static int[] doubleUp(int[] numbers) {
    return Arrays.stream(numbers).map(e -> e * 2).toArray();
  }
}