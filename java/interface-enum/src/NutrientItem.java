class NutrientItem {
  private double quantityInGram;
  private Nutrient nutrient;

  NutrientItem(Nutrient nutrient, double quantityInGram) {
    this.nutrient = nutrient;
    this.quantityInGram = quantityInGram;
  }

  public double getCalorieCount() {
    return this.nutrient.getCalorieCount() * this.quantityInGram;
  }
}