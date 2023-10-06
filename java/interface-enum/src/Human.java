class Human implements Animal {
  private String name;
  private int age;

  Human(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public void breathe() {
    System.out.println("I am breathing Oxygen");
  }

  public void eat(Edible edible) {
    System.out.println(this.name + " is eating " + edible);
  }
}