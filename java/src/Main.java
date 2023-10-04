class Main {
  public static void testReplace() {
    String testDescription = "Should replace the specified character";
    String actualReplacedText = MyString.replace("moon", 'o', 'u');
    String expectedText = "muun";

    Assert.strictEqual(actualReplacedText, expectedText, testDescription);
  }

  public static void main(String[] args) {
    testReplace();
  }
}