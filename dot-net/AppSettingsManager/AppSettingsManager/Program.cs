using AppSettingsManager.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: false, reloadOnChange: true);
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}
builder.Configuration.AddEnvironmentVariables();
builder.Configuration.AddCommandLine(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.Configure<TwilioConfig>(builder.Configuration.GetSection("Twilio"));
var launchDarklyConfig = builder.Configuration.GetSection("LaunchDarkly").Get<LaunchDarklyConfig>()!;
var socialLoginSettings = builder.Configuration.GetSection("SocialLoginSettings").Get<SocialLoginSettings>()!;
builder.Services.AddSingleton(launchDarklyConfig);
builder.Services.AddSingleton(socialLoginSettings);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();