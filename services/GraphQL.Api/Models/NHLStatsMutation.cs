using GraphQL.Types;
using NHLStats.Core.Data;
using NHLStats.Core.Models;


namespace GraphQLApi.Models
{
    public class NHLStatsMutation : ObjectGraphType
    {
        public NHLStatsMutation(IPlayerRepository playerRepository)
        {
            Name = "CreatePlayerMutation";

            Field<PlayerType>(
                "createPlayer",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PlayerInputType>> { Name = "player" }
                ),
                resolve: context =>
                {
                    var player = context.GetArgument<Player>("player");
                    return playerRepository.Add(player);
                });
        }
    }
}