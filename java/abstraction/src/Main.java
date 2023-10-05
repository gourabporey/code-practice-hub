class Main {
  public static void main(String[] args) {
    Pokemon pikachu1 = new Pikachu();
    Pokemon pikachu2 = new Pikachu();

    System.out.println(pikachu1);
    System.out.println(pikachu2);

    pikachu1.attack(pikachu2);
    
    System.out.println(pikachu1);
    System.out.println(pikachu2);
  }
}