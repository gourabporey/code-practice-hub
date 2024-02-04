package store

type Store interface {
	GetAllMovies() []Movie
	GetMovieById(string) Movie
	CreateMovie(Movie) error
	DeleteMovie(string) error
}
