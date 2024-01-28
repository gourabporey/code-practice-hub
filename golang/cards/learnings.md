## Variable declaration

We can declare variables globally but can't assign value to it
The below code is valid one

```go

package main

import "fmt"

var deckSize int

func main() {
  deckSize = 50
  fmt.Println(deckSize)
}
```

## List in go

- Array - Fixed length of elements
- Slice - Variable size of elements

### Slice

Declaring, appending and looping through slices

```go
// declaring slice
cards := []string {"J", "K", "Q"}

// Append element
cards = append(cards, "A")

// Looping through
for cardIndex, card := range cards {
  fmt.Println(cardIndex, card)
}
```

### Things to keep in mind:

- Unused variable gives error in go lang

## Type Declaration

```go
type deck []string
```

## Receiver functions

```go
func (d deck) print() {
  for cardIndex, card := range d {
    fmt.Println(cardIndex, card)
  }
}
```

## How to ignore variables

- use \_ (underscore) in place of the variable

## Specifying range in slice

- elements[startIndexIncluding: uptoNotIncluding]

- if any of the range is out of bound then go lang throws error
