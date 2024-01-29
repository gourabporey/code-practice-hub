package main

import (
	"fmt"
	"io/fs"
	"math/rand"
	"os"
	"strings"
	"time"
)

type deck []string

func newDeck(cardSuits, cardValues []string) deck {
	cards := deck{}

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

func (d deck) toString() string {
	return strings.Join([]string(d), "\n")
}

func (d deck) saveToFile(filename string) error {
	message := []byte(d.toString())
	err := os.WriteFile(filename, message, fs.FileMode(0644))
	return err
}

func newDeckFromFile(filename string) deck {
	dataInByte, err := os.ReadFile(filename)
	
	if err != nil {
		fmt.Println("Error: ", err)
		return deck{}
	}

	cards := strings.Split(string(dataInByte), "\n")

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