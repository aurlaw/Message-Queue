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
			                                       options.UseSqlServer(Configuration["ConnectionStrings:Default"]));
			services.AddTransient<IPlayerRepository, PlayerRepository>();
			services.AddTransient<ISkaterStatisticRepository, SkaterStatisticRepository>();

			services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, NHLStatsContext db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
			db.EnsureSeedData();
        }
    }
}
