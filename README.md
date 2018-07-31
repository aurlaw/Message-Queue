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

This demo is based on `https://github.com/mmacneil/ASPNetCoreGraphQL` with an accompanying blog on ```https://fullstackmark.com/post/17/building-a-graphql-api-with-aspnet-core-2-and-entity-framework-core```

Still in development

```
$ dotnet run --project services/GraphQL.API
```
