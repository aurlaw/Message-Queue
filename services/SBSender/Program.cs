using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SBSender
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
            var sender = new Sender(endPoint, queue);
            const int numberOfMessages = 10;

            Console.WriteLine("======================================================");
            Console.WriteLine($"Press any key to exit after sending all ${numberOfMessages} messages.");
            Console.WriteLine("======================================================");

            // Send Messages
            await sender.SendMessagesAsync(numberOfMessages);
                        
            Console.ReadKey();

            await sender.Close();

        }

    }
}
