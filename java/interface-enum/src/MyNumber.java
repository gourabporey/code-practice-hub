class MyNumber {
  public static boolean isEven(int number) {
    return number % 2 == 0;
  }

  public static int sum(int a, int b) {
    return a + b;
  }

  public static int sumAll(int[] numbers) {
    int sum = 0;

    for(int numIndex = 0; numIndex < numbers.length; numIndex++) {
      sum += numbers[numIndex];
    }

    return sum;
  }

  public static long factorial(int num) {
    if(num <= 1) return 1;
    return num * factorial(num - 1);
  }
}