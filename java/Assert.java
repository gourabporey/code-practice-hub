class Assert {
  public static String formatMismatchMessage(String actual, String expected) {
    String msg = "Actual: " + actual + "\n" + "Expected: " + expected + "\n";
    return msg;
  }

  public static void strictEqual(String actual, String expected, String msg) {
    boolean result = actual.equals(expected);
    String resultMsg = result ? 
      ": Passed\n" : 
      ": Failed\n" + formatMismatchMessage(actual, expected);

    System.out.println(msg + resultMsg);
  }
}