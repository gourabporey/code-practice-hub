package main

import "fmt"

func newCard() string {
	return "Ace of cards"
}
 
func main() {
	cards := []string {newCard(), newCard()}
	fmt.Println(cards)

	for cardIndex, card := range cards {
		fmt.Println(cardIndex, card)
	}
}