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

    System.out.println(MyNumber.factorial(5));
  }
}