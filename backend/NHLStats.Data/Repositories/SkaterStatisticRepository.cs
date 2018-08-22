
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NHLStats.Core.Data;
using NHLStats.Core.Models;

namespace NHLStats.Data.Repositories
{
    public class SkaterStatisticRepository : ISkaterStatisticRepository
    {
        private readonly NHLStatsContext _db;

        public SkaterStatisticRepository(NHLStatsContext db)
        {
            _db = db;
        }

        public async Task<List<SkaterStatistic>> Get(int playerId, int? limit = null, int? offset = null, bool? sortAsc=null)
        {
            var results = _db.SkaterStatistics.Include(ss=>ss.Season).Include(ss=>ss.League).Include(ss=>ss.Team).Where(ss => ss.PlayerId == playerId);
            if(sortAsc.HasValue) 
            {
                if(sortAsc.Value) 
                {
                    results = results.OrderByDescending(ss => ss.Id);
                } else
                 {
                    results = results.OrderBy(ss => ss.Id);
                }
            } 
            else 
            {
                results = results.OrderByDescending(ss => ss.Id);
            }
            if(offset.HasValue) 
            {
                results = results.Skip(offset.Value);
            }
            if(limit.HasValue) 
            {
                results = results.Take(limit.Value);
            }
            
            return await results.ToListAsync();
        }

       
      

        public async Task<SkaterStatistic> Add(SkaterStatistic stat)
        {
                    //TODO: Handle SkaterStatistic
            // await _db.Players.AddAsync(player);
            // await _db.SaveChangesAsync();
            // BackgroundJob.Enqueue(() => Console.WriteLine($"added {player.Name}"));
            return null;
        }

        public async  Task<List<SkaterStatistic>> AddRange(List<SkaterStatistic> statList)
        {
                    //TODO: Handle SkaterStatistic
            // await _db.Players.AddAsync(player);
            // await _db.SaveChangesAsync();
            // BackgroundJob.Enqueue(() => Console.WriteLine($"added {player.Name}"));
            return null;
        }

        public async Task<List<Season>> GetAllSeasons() 
        {
            return await _db.Seasons.ToListAsync();
        }

        public async Task<List<Team>> GetAllTeams()
        {
            return await _db.Teams.ToListAsync();
        }

        public async Task<List<League>> GetAllLeagues()
        {
             return await _db.Leagues.ToListAsync();   
        }

    }
}
