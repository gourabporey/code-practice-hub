class Main {
  public static void testReplace() {
    String testDescription = "Should replace the specified character";
    String actualReplacedText = MyString.replace("moon", 'o', 'u');
    String expectedText = "muun";

    Assert.strictEqual(actualReplacedText, expectedText, testDescription);
  }

  static void display(int[] elements) {
    for(int element: elements) {
      System.out.println(element);
    }
  }

  public static void main(String[] args) {
    int[] elements = {1, 2, 3, 4};
    int[] doubledUpNumbers = MyArray.doubleUp(elements);
    int[] numbers = null;

    System.out.println(numbers);

    display(doubledUpNumbers);
  }
}