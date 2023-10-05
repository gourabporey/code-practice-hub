enum Nutrient {
  FAT(9000),
  CARBS(4000),
  PROTEIN(4000);

  private final double calorieCount;

  private Nutrient(double calorieCount) {
    this.calorieCount = calorieCount;
  }

  public double getCalorieCount() {
    return this.calorieCount;
  }
}