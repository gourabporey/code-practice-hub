using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AppSettingsManager.Models;

namespace AppSettingsManager.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IConfiguration _configuration;
    private readonly TwilioConfig _twilioConfig;

    public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        _twilioConfig = _configuration.GetSection("Twilio").Get<TwilioConfig>()!;
    }

    public IActionResult Index()
    {
        ViewBag.sendGridKey = _configuration.GetValue<string>("SendGrid");
        ViewBag.BottomLevelSetting = _configuration
            .GetValue<string>("FirstLevelSetting:SecondLevelSetting:BottomLevelSetting");
        ViewBag.TwilioApiKey = _twilioConfig.ApiKey;
        ViewBag.TwilioAccountSid = _twilioConfig.AccountSid;
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}