package api

import (
	"go-movies-crud/movies/store"

	"github.com/gofiber/fiber/v2"
)

type Handlers struct {
	Movies MoviesHandler
}

type MoviesHandler struct {
	store store.Store
}

func (m *MoviesHandler) GetMovieById(ctx *fiber.Ctx) error {
	movieId := ctx.Params("id")
	movie := m.store.GetMovieById(movieId)
	return ctx.JSON(movie)
}

func (m *MoviesHandler) GetAllMovies(ctx *fiber.Ctx) error {
	ctx.Set("content-type", "application/json")
	movies := m.store.GetAllMovies()
	return ctx.JSON(movies)
}

func (m *MoviesHandler) CreateMovie(ctx *fiber.Ctx) error {
	ctx.Set("content-type", "application/json")
	movie := new(store.Movie)
	_ = ctx.BodyParser(movie)
	return m.store.CreateMovie(*movie)
}

func (m *MoviesHandler) DeleteMovie(ctx *fiber.Ctx) error {
	movieId := ctx.Params("id")
	return m.store.DeleteMovie(movieId)
}