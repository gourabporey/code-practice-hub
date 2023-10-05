class Pokemon {
  private String name;
  private int hp;

  Pokemon(String name, int hp) {
    this.name = name;
    this.hp = hp;
  }

  public void attack(Pokemon opponent) {}

  public void takeDamage(int damage) {
    this.hp -= damage;
  }

  public String toString() {
    return String.format("Name: %s, HP: %d", this.name, this.hp);
  }
}