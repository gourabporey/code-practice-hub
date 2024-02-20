package main

import (
	"fmt"
	"reflect"

	"golang.org/x/tools/go/analysis/passes/nilfunc"
)

type movie struct {
	title    string
	actors   []string
	director *director
}

type director struct {
	firstname string
	lastname  string
}

type iterateFunc func(string, any) any

func iterate(m movie, it iterateFunc) {
	reflect.ValueOf(m)
}

func main() {
	atlee := director{firstname: "Atlee", lastname: "Kumar"}

	jawaan := movie{title: "Jawan", actors: []string{"Srk", "Deepika", "Nayanthara"}, director: &atlee}

	iterate(jawaan, func(key string, value any) any {
		fmt.Printf("\nKey", key)
		fmt.Printf("\tValue", value)
		return nil
	})
}
