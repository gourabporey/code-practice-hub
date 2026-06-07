using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace fluent_validation_example.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IValidator<WeatherForecast> _validator;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IValidator<WeatherForecast> validator)
    {
        _logger = logger;
        _validator = validator;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

    [HttpPost(Name = "AddWeatherForecast")]
    public async Task<IActionResult> AddWeatherForecast(
        [FromBody, Required] WeatherForecast weatherForecast
    )
    {
        _logger.LogInformation("Validating the payload for WeatherForecast");

        var validationResult = await _validator.ValidateAsync(weatherForecast);
        if (!validationResult.IsValid)
        {
            _logger.LogError("Validation failed for weather forecast");
            return BadRequest(validationResult.Errors);
        }
        _logger.LogError("Validation successful for weather forecast");

        return Ok(weatherForecast);
    }
}
