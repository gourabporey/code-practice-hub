package main

import (
	"fmt"
	"go-movies-crud/movies/api"
)

func main() {
	port := ":9999"
	api.StartServer(port, func() { fmt.Println("Server started on port", port)})
}
