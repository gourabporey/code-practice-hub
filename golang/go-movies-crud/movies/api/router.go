package api

import "github.com/gofiber/fiber/v2"

func BindRoutes(app *fiber.App, handlers *Handlers) {
	movies := app.Group("/movies")

	movies.Get("/", handlers.Movies.GetAllMovies)
	movies.Get("/:id", handlers.Movies.GetMovieById)
	movies.Post("/", handlers.Movies.CreateMovie)
	movies.Delete("/:id", handlers.Movies.DeleteMovie)
}