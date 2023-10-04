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