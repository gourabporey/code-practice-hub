using System.Data;
using FluentValidation;

namespace fluent_validation_example;

public class WeatherForecastValidator : AbstractValidator<WeatherForecast>
{
    public WeatherForecastValidator()
    {
        RuleFor(x => x.Summary).MaximumLength(20).When(x => x.Summary is not null);
        RuleFor(x => x.TemperatureC).GreaterThanOrEqualTo(-273).WithMessage("The lowest temperature possible is absolute zero, which is -273°C");
        RuleFor(x => x.TemperatureF).GreaterThanOrEqualTo(-459).WithMessage("The lowest temperature possible is absolute zero, which is -459°F");
    }
}