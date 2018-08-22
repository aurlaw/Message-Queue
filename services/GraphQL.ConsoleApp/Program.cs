using System;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Hangfire;
using Hangfire.SqlServer;

namespace GraphQL.ConsoleApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
             var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
             var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environmentName}.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();


            var configuration = builder.Build();

            JobStorage.Current = new SqlServerStorage(configuration.GetConnectionString("HangfireConnection"));
            //LogProvider.SetCurrentLogProvider(new ColouredConsoleLogProvider());

            using (var server = new BackgroundJobServer())
            {
                Console.WriteLine("Hangfire Server started. Press any key to exit...");
                Console.ReadKey();
            }

        }

    }
}
