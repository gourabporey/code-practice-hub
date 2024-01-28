package main

import "fmt"

func main() {
	cards := newDeckFromFile("my_cards")
	hands, _ := deal(cards, 5)

	hands.print()
	fmt.Println("After shuffling")
	hands.shuffleV2()
	hands.print()
}