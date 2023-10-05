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

    Food maggie = new Food(maggieNutrients, 100);

    System.out.println("Calorie count of maggie is: " + maggie.getCalorieCount() + " Cal");
  }
}