package arrays

func Map[T any, U any](elements []T, mapper func(T) U) []U {
	mappedElements := make([]U, 0, len(elements))

	for _, el := range elements {
		mappedElements = append(mappedElements, mapper(el))
	}

	return mappedElements
}
