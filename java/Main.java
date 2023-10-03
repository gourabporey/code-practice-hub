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
}

class MyString {
  public static String repeat(char character, int times) {
    String repeatedCharacters = "";
    
    for(int charCount = 0; charCount < times; charCount++) {
      repeatedCharacters += character;
    }

    return repeatedCharacters;
  }

  public static String padLeft(String text, int padSize) {
    final char SPACE = ' ';
    String padding = repeat(SPACE, padSize);
    return padding + text;
  }

  public static String replace(String text, char oldChar, char newChar) {
    int currentCharIndex = 0;
    String replacedText = "";

    while(currentCharIndex < text.length()) {
      char currentChar = text.charAt(currentCharIndex);
      replacedText += currentChar == oldChar ? newChar : currentChar;
      currentCharIndex++;
    }

    return replacedText;
  }
}

class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
    System.out.println(MyNumber.isEven(5));
    System.out.println(MyNumber.sum(4, 6));
    
    int[] numbers = {10, 2, 3};
    System.out.println(MyNumber.sumAll(numbers));

    System.out.println(MyString.repeat('G', 5));
    System.out.println(MyString.padLeft("gourab", 5));

    System.out.println(MyString.replace("Gourab", 'G', 'g'));
  }
}