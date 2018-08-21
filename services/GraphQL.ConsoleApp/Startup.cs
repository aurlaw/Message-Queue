using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NHLStats.Core.Data;
using NHLStats.Data;
using NHLStats.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Hangfire;

namespace GraphQL.ConsoleApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddDbContext<NHLStatsContext>(options => 
			                                       options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			services.AddTransient<IPlayerRepository, PlayerRepository>();
			services.AddTransient<ISkaterStatisticRepository, SkaterStatisticRepository>();

        services.AddHangfire(configuration =>
            {
                // Do pretty much the same as you'd do with 
                // GlobalConfiguration.Configuration in classic .NET

                // NOTE: logger and activator would be configured automatically, 
                // and in most cases you don't need to configure those.

                configuration.UseSqlServerStorage(Configuration.GetConnectionString("HangfireConnection"));

                // ... maybe something else, e.g. configuration.UseConsole()
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, NHLStatsContext db)
        {
            app.UseHangfireDashboard(); 

            // using (var server = new BackgroundJobServer())
            // {
            //     Console.WriteLine("Hangfire Server started. Press any key to exit...");
            //     Console.ReadKey();
            // }

        }
    }
}
