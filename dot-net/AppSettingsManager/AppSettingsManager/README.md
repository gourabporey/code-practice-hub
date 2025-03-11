### Default flow/hierarchy for the configuration precedence (Top to bottom higher priority)
1. Appsettings
2. Appsettings Environment specific
3. User secrets (only applicable in development environment)
4. Environment variables
5. Command line

### User secrets
- Initialize the user secrets - `dotnet user-secrets init`
- Set a user secret - `dotnet user-secrets set <key> <value>`

### Environment variables
- Added inside the `launchSettings.json` file for development
- To access nested keys; we've to mention using double underscore, eg. `Twilio__ApiKey`

### Command line
`dotnet run Twilio:Apikey="Twiliokey from commandline"`

### Points to remember
- The default builder configures the default hierarchy, which obviously can be changed and custom json file could be added in between.