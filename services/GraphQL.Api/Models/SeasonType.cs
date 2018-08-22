using GraphQL.Types;
using NHLStats.Core.Data;
using NHLStats.Core.Models;
namespace GraphQLApi.Models
{
    public class SeasonType : ObjectGraphType<Season>
    {
        public SeasonType()
        {
            Field(x => x.Id);
            Field(x => x.Name);
        }   
    }
}