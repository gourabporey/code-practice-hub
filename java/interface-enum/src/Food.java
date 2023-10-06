class Food implements Edible {
  private String foodName;
  private double quantityInGram;
  private NutrientItem[] nutrientItems;
 
  Food(String foodName, NutrientItem[] nutrientItems, double quantityInGram) {
    this.foodName = foodName;
    this.nutrientItems = nutrientItems;
    this.quantityInGram = quantityInGram;
  }

  public double getCalorieCount() {
    double totalCalorieCount = 0;
    
    for(NutrientItem nutrientItem : this.nutrientItems) {
      totalCalorieCount += nutrientItem.getCalorieCount();
    }

    return totalCalorieCount * quantityInGram;
  }

  public String toString() {
    return this.foodName;
  }
}