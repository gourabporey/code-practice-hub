package store

import (
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
)

type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

type Director struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type Movies []Movie

func (movies Movies) findMovieIndex(id string) int {
	for index, movie := range movies {
		if movie.ID == id {
			return index
		}
	}

	return -1
}

func (movies Movies) findById(id string) *Movie {
	movieIndex := movies.findMovieIndex(id)

	if movieIndex == -1 {
		return nil
	}

	return &movies[movieIndex]
}

type Inmemory struct {
	movies Movies
}

type Option func(store Inmemory) *Inmemory

func (i *Inmemory) WithMovies(list []Movie) *Inmemory {
	i.movies = list
	return i
}

func NewInmemoryStore() *Inmemory {
	return &Inmemory{
		movies: make([]Movie, 0),
	}
}

func (inmemoryStore *Inmemory) GetAllMovies() []Movie {
	return inmemoryStore.movies
}

func (inmemoryStore *Inmemory) GetMovieById(id string) Movie {
	return *inmemoryStore.movies.findById(id)
}

func (inmemoryStore *Inmemory) CreateMovie(movieInfo Movie) error {
	movieInfo.ID = uuid.NewString()
	fmt.Println(movieInfo)
	inmemoryStore.movies = append(inmemoryStore.movies, movieInfo)
	return nil
}

func (inmemoryStore *Inmemory) DeleteMovie(id string) error {
	movieIndex := inmemoryStore.movies.findMovieIndex(id)

	if movieIndex == -1 {
		errorMessage := strings.Join([]string{"Movie doesn't exist with ID", id}, " : ")
		return errors.New(errorMessage)
	}

	inmemoryStore.movies = append(
		inmemoryStore.movies[:movieIndex], inmemoryStore.movies[movieIndex+1:]...,
	)

	return nil
}
