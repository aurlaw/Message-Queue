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
using GraphQL.Api.Models;
using GraphQL;
using GraphQL.Types;

namespace GraphQL.Api
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
            services.AddMvc();
			services.AddDbContext<NHLStatsContext>(options => 
			                                       options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			services.AddTransient<IPlayerRepository, PlayerRepository>();
			services.AddTransient<ISkaterStatisticRepository, SkaterStatisticRepository>();
            // GraphQL
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddSingleton<NHLStatsQuery>();
            services.AddSingleton<NHLStatsMutation>();
            services.AddSingleton<PlayerType>();
            services.AddSingleton<PlayerInputType>();
            services.AddSingleton<SkaterStatisticType>();

            var sp = services.BuildServiceProvider();
            services.AddSingleton<ISchema>(new NHLStatsSchema(new FuncDependencyResolver(type => sp.GetService(type))));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, NHLStatsContext db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseGraphiQl();
            app.UseMvc();
			db.EnsureSeedData();
        }
    }
}
