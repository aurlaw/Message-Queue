
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
    }
}
