class Pikachu extends Pokemon {
  Pikachu() {
    super("Pikachu", 35);
  }

  public void attack(Pokemon opponent) {
    System.out.println("Pikachuuuuu...");
    opponent.takeDamage(10);
  }
}