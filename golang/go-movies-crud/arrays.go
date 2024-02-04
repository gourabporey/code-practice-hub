package main

func findIndex[T any](elements []T, predicate func(T) bool) int {
	for index, item := range elements {
		if predicate(item) == true {
			return index
		}
	}

	return -1
}