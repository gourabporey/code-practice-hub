namespace AppSettingsManager.Models;

public class SocialLoginSettings
{
    public bool SocialLoginEnabled { get; set; }
    public required KeyValue FacebookSetting { get; set; }
    public required KeyValue GoogleSetting { get; set; }
}

public class KeyValue
{
    public required string Key { get; set; }
    public required string Value { get; set; }
}