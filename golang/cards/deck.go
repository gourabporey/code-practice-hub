package main

import "fmt"

type deck []string

func newDeck() deck {
	cards := deck{}

	cardSuits := []string{"Diamonds", "Clubs", "Spades", "Hearts"}
	cardValues := []string{"Ace", "Two", "Three"}

	for _, suit := range cardSuits {
		for _, value := range cardValues {
			card := value + " Of " + suit
			cards = append(cards, card)
		}
	}

	return cards
}

func (d deck) print() {
  for cardIndex, card := range d {
    fmt.Println(cardIndex, card)
  }
}

func deal(d deck, handSize int) (deck, deck) {
	return d[:handSize], d[handSize:]
}