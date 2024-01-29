package main

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func getSuits() []string {
	return []string{"Diamonds", "Clubs", "Spades", "Hearts"}
}

func getCardValues() []string {
	return []string{"Ace", "Two", "Three"}
}

func TestNewDeck(t *testing.T) {
	myDeck := newDeck(getSuits(), getCardValues())

	expectedNoOfCards := 12
	actualNoOfCards := len(myDeck)

	assert.Equal(t, expectedNoOfCards, actualNoOfCards, "Expected no of cards to be 12 for 4 suits and 3 card values")
}

func TestSaveToDeckAndNewDeckFromFile(t *testing.T) {
	testingFileName := "_deckTesting"

	os.Remove(testingFileName)

	myDeck := newDeck(getSuits(), getCardValues())

	myDeck.saveToFile(testingFileName)

	assert.FileExists(t, testingFileName, "Should have created one file called _deckTesting")

	loadedDeck := newDeckFromFile(testingFileName)

	assert.Equal(t, 12, len(loadedDeck), "Expected no of cards to be 12 for 4 suits and 3 card values")

	// assert.Equal(t, myDeck, loadedDeck, "Deck before writing to file should be same as deck after retrieving from file")
}
