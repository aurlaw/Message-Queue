# Message Queue

Create a ```appsettings.json``` file for both SBSender and SBReceiver projects.

```json
{
    "AppSettings": {
        "AzureSBEndpoint": "AZURE-SERVICE-BUS-ENDPOINT",
        "AzureSBQueue": "AZURE-SERVICE-BUS-QUEUE"
    }
}
```

### SB Sender
```
dotnet run --project services/SBSender
```

### SB Receiver
```
dotnet run --project services/SBReceiver
```

