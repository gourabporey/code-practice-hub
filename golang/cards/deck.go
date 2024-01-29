package main

import (
	arrays "cards/utils"
	"fmt"
	"io/fs"
	"math/rand"
	"os"
	"strings"
	"time"
)

type card struct {
	suit  string
	value string
}

type deck []card

func newDeck(cardSuits, cardValues []string) deck {
	cards := deck{}

	for _, suit := range cardSuits {
		for _, value := range cardValues {
			card := card{suit: suit, value: value}
			cards = append(cards, card)
		}
	}

	return cards
}

func (d deck) print() {
	for cardIndex, card := range d {
		fmt.Println(cardIndex, card.toString(" Of "))
	}
}

func deal(d deck, handSize int) (deck, deck) {
	return d[:handSize], d[handSize:]
}

func (c card) toString(sep string) string {
	return c.value + sep + c.suit
}

func (d deck) toString() string {
	cardSeparator := "-"
	deckSeparator := "\n"

	cardsData := arrays.Map[card, string](d, func(c card) string {
		return c.toString(cardSeparator)
	})

	cards := strings.Join(cardsData, deckSeparator)

	return cards
}

func (d deck) saveToFile(filename string) error {
	message := []byte(d.toString())
	err := os.WriteFile(filename, message, fs.FileMode(0644))
	return err
}

func cardFromData(c string) card {
	cardParts := strings.Split(c, "-")
	suit := cardParts[0]
	value := cardParts[1]
	return card{suit, value}
}

func newDeckFromFile(filename string) deck {
	dataInByte, err := os.ReadFile(filename)

	if err != nil {
		fmt.Println("Error: ", err)
		return deck{}
	}

	cardsData := strings.Split(string(dataInByte), "\n")
	cards := arrays.Map[string, card](cardsData, cardFromData)

	return deck(cards)
}

func (d deck) shuffle() {
	rand.Shuffle(len(d), func(i, j int) {
		d[i], d[j] = d[j], d[i]
	})
}

func (d deck) shuffleV2() {
	seed := time.Now().UnixNano()
	source := rand.NewSource(seed)
	randNumGenerator := rand.New(source)

	for i := range d {
		newPos := randNumGenerator.Intn(len(d) - 1)
		d[newPos], d[i] = d[i], d[newPos]
	}
}
