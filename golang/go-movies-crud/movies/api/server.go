package api

import (
	"go-movies-crud/movies/store"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func StartServer(port string, callback func()) {
	app := fiber.New()

	atlee := store.Director{
		Firstname: "Atlee",
		Lastname: "Kumar",
	}
	
	jawan := store.Movie{
		ID : "1",
		Isbn: "3445",
		Title : "Jawan",
		Director: &atlee,
	}

	movies := []store.Movie{}
	movies = append(movies, jawan)

	handlers := Handlers{
		Movies: MoviesHandler{
			store: store.NewInmemoryStore().WithMovies(movies),
		},
	}

	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} : ${method} ${path}\n",
	}))

	BindRoutes(app, &handlers)
	
	callback()
	app.Listen(port)
}