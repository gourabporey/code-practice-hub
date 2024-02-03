package main

import (
	"fmt"
	"log"
	"net/http"
)

func formHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()

	if err != nil {
		fmt.Fprintf(w, "Error occurred while parsing form %v\n", err)
	}

	name := r.FormValue("name")
	address := r.FormValue("address")

	fmt.Fprintf(log.Writer(), "%v lives in %v\n", name, address)
	fmt.Fprintf(w, "Name: %v\n", name)
	fmt.Fprintf(w, "Address: %v", address)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/hello" {
		http.Error(w, "404 Not found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Unallowed action", http.StatusMethodNotAllowed)
		return
	}

	fmt.Println("Hello world")
	w.Write([]byte("Hello world"))
}

func main() {
	fileServer := http.FileServer(http.Dir("./static"))

	http.Handle("/", fileServer)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/hello", helloHandler)

	const port string = ":9999"
	fmt.Println("Server started at port", port)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
