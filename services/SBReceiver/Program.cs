using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SBReceiver
{
    class Program
    {
        static void Main(string[] args)
        {
            MainAsync().GetAwaiter().GetResult();
        }

        static async Task MainAsync()
        {
                    // Adding JSON file into IConfiguration.
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            var settings = config.GetSection("AppSettings");
            var endPoint  = settings["AzureSBEndpoint"];
            var queue  = settings["AzureSBQueue"];
            Console.WriteLine($"Using ${endPoint} - ${queue}");
            var receiver = new Receiver(endPoint, queue);

            Console.WriteLine("======================================================");
            Console.WriteLine($"Press any key to exit after receiving all the messages.");
            Console.WriteLine("======================================================");

            // register receiver
            receiver.RegisterOnMessageHandlerAndReceiveMessages();

            Console.ReadKey();

            await receiver.Close();

        }        
    }
}
