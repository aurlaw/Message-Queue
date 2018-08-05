using GraphQL.Types;
using NHLStats.Core.Data;
using NHLStats.Core.Models;
namespace GraphQL.Api.Models
{
    public class NHLStatsQuery : ObjectGraphType
    {
        public NHLStatsQuery(IPlayerRepository playerRepository)
        {
            Field<PlayerType>(
                "player",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
                resolve: context =>  playerRepository.Get(context.GetArgument<int>("id")));

            Field<PlayerType>(
                "randomPlayer",
                resolve: context => playerRepository.GetRandom());

            Field<ListGraphType<PlayerType>>(
                "players",
                resolve: context => playerRepository.All());
        }
    }
}