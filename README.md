# Message Queue


```
$ dotnet build
```

Create a ```appsettings.json``` file for both SBSender and SBReceiver projects.

```
{
    "AppSettings": {
        "AzureSBEndpoint": "AZURE-SERVICE-BUS-ENDPOINT",
        "AzureSBQueue": "AZURE-SERVICE-BUS-QUEUE"
    }
}
```

### SB Sender
```
$ dotnet run --project services/SBSender
```

### SB Receiver
```
$ dotnet run --project services/SBReceiver
```



## GraphQL Endpoint

This demo is based on https://github.com/mmacneil/ASPNetCoreGraphQL with an accompanying blog on https://fullstackmark.com/post/17/building-a-graphql-api-with-aspnet-core-2-and-entity-framework-core

Runtime: .NET Core 2.1
NLog
Hangfire

Still in development

```
$ dotnet restore
$ dotnet run --project services/GraphQL.Api
```

Hangfire Dashboard
```http://localhost:50000/hangfire/```

GraphQL Playground
```http://localhost:50000/ui/playground/```


GraphQL Schema found under
```services/GraphQL.Api/schema/schema.graphql```

```
$ npm install -g graphql-cli
$ cd services/GraphQL.Api/schema
$ graphql get-schema
```

Mutation example

```
mutation ($player: PlayerInput!) {
    createPlayer(player: $player) {
        id name
    }
}
```
vars
```
{
    "player": {
    "name": "Jaromir Jagr",
    "birthPlace": "Kladno, Czech Republic",
    "height": "6'03",
    "weightLbs": 230,
    "birthDate": "1972-02-15"
    },
    "skaterStats": [
            {
            "seasonId": 17,
            "leagueId": 1,
            "teamId": 5,
            "gamesPlayed": 82,
            "goals": 24,
            "assists": 43,
            "points": 67,
            "plusMinus": 16
            }
        ]  
}

```



GraphQL.ConsoleApp and GraphQL.Api

Additional connection string ```HangfireConnection``` for DB ```HangfireGQL```


## Hangfire Console
Runtime: .NET Core 2.1

Still in development

```
$ dotnet run --project services/GraphQL.ConsoleApp
```


