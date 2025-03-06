#include <stdio.h>

int max(int a, int b) {
  return a > b ? a : b;
}

int min(int a, int b) {
  return a < b ? a : b;
}

int maxArea(int* height, int heightSize) {
  int maxTillNow = 0;

  for (int firstBarIndex = 0; firstBarIndex < heightSize - 1; firstBarIndex++) {
    int firstBar = height[firstBarIndex];
    
    for (int lastBarIndex = 0; lastBarIndex < heightSize; lastBarIndex++) {
      int lastBar = height[lastBarIndex];
      maxTillNow = max(maxTillNow, min(firstBar, lastBar) * (lastBarIndex - firstBarIndex));
    }
  }

  return maxTillNow;
}

int main() {
  int height[] = {1,8,6,2,5,4,8,3,7};
  int mostWater = maxArea(height, 9); 
  printf("Highest amount of water :%d\n", mostWater);
}
