class Food implements Edible {
  private NutrientItem[] nutrientItems;
  private double quantityInGram;
 
  Food(NutrientItem[] nutrientItems, double quantityInGram) {
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
}