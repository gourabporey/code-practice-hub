class Main {
  static void display(int[] elements) {
    for(int element: elements) {
      System.out.println(element);
    }
  }

  public static void main(String[] args) {
    NutrientItem fatInMaggie = new NutrientItem(Nutrient.FAT, 0.157);
    NutrientItem carbsInMaggie = new NutrientItem(Nutrient.CARBS, 0.635);
    NutrientItem proteinInMaggie = new NutrientItem(Nutrient.PROTEIN, 0.08);

    NutrientItem[] maggieNutrients = { 
      fatInMaggie, carbsInMaggie, proteinInMaggie 
    };

    Food maggie = new Food("Maggie", maggieNutrients, 100);

    String maggieNutrientMsg = String.format("Calorie count of %s is %f Cal", maggie, maggie.getCalorieCount());

    System.out.println(maggieNutrientMsg);

    Human gourab = new Human("Gourab", 22);
    gourab.eat(maggie);
  }
}