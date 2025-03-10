using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AppSettingsManager.Models;
using Microsoft.Extensions.Options;

namespace AppSettingsManager.Controllers;

public class HomeController(
    ILogger<HomeController> logger,
    IConfiguration configuration,
    IOptions<TwilioConfig> twilioConfigOptions,
    LaunchDarklyConfig launchDarklyConfig,
    SocialLoginSettings socialLoginSettings)
    : Controller
{
    private readonly ILogger<HomeController> _logger = logger;

    public IActionResult Index()
    {
        // Direct configuration usage
        ViewBag.sendGridKey = configuration.GetValue<string>("SendGrid");
        ViewBag.BottomLevelSetting = configuration
            .GetValue<string>("FirstLevelSetting:SecondLevelSetting:BottomLevelSetting");
        
        // IOptions usage
        ViewBag.TwilioApiKey = twilioConfigOptions.Value.ApiKey;
        ViewBag.TwilioAccountSid = twilioConfigOptions.Value.AccountSid;
        
        // Inject LaunchDarklySdkkey
        ViewBag.LaunchDarklySdkkey = launchDarklyConfig.Sdkkey;
        
        // Nested configuration
        ViewBag.GoogleSetting = socialLoginSettings.GoogleSetting.Value;
        ViewBag.FacebookSetting = socialLoginSettings.FacebookSetting.Value;
        
        // Connection String
        ViewBag.DatabaseConnectionString = configuration.GetConnectionString("Database");
        
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