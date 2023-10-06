class Human implements Animal {
  private int age;
  private String name;
  private double calorieIntake;

  Human(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public void breathe() {
    System.out.println("I am breathing Oxygen");
  }

  public void eat(Edible edible) {
    double calorieIntake = edible.getCalorieCount(); 
    this.calorieIntake += calorieIntake;
    
    System.out.println(String.format("%s consumed %.2f calories by eating %s", this.name, calorieIntake, edible));
  }
}