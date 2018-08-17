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

Still in development

```
$ dotnet restore
$ dotnet run --project services/GraphQL.Api
```

GraphQL Schema
```services/GraphQL.Api/schema/schema.graphql```


```
$ npm install -g graphql-cli
$ cd services/GraphQL.Api/schema
$ graphql get-schema
```

