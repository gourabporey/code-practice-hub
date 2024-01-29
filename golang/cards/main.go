package main

import "fmt"

func main() {
	suits := []string{"Diamonds", "Clubs", "Spades", "Hearts"}
	cardValues := []string{"Ace", "Two", "Three"}

	cards := newDeck(suits, cardValues)
	hands, _ := deal(cards, 5)

	hands.print()
	fmt.Println("After shuffling")
	hands.shuffleV2()
	hands.print()
}