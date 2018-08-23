using GraphQL.Types;
using NHLStats.Core.Data;
using NHLStats.Core.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace GraphQL.Api.Models
{
    public class NHLStatsMutation : ObjectGraphType
    {
        public NHLStatsMutation(IPlayerRepository playerRepository, ISkaterStatisticRepository skaterRepository, ILogger<NHLStatsMutation> logging)
        {
            Name = "CreatePlayerMutation";

            Field<PlayerType>(
                "createPlayer",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PlayerInputType>> { Name = "player" },
                    new QueryArgument<ListGraphType<SkaterStatisticInputType>> { Name = "skaterStats" }
                ),
                resolve: context => 
                {
                    var player = context.GetArgument<Player>("player");
                    var skaterStats = context.GetArgument<List<SkaterStatistic>>("skaterStats");
                    var addedPlayer = playerRepository.Add(player).Result;
                    logging.LogInformation($"stats:  {skaterStats?.Count}");
                    logging.LogInformation($"addedPlayer: {addedPlayer.Id}");
                    logging.LogInformation($"player: {player.Id}");
                    if(skaterStats != null) 
                    {
                        skaterStats.ForEach(s => {
                            s.PlayerId = addedPlayer.Id;
                            logging.LogInformation($"{s.PlayerId}");
                            }
                       );

                        skaterRepository.AddRange(skaterStats);
                    }
                    
                    return addedPlayer;
                });
        }
    }
}