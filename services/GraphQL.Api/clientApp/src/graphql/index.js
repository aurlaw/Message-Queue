import gql from "graphql-tag";

export const leaguesQuery = gql`
    {
        leagues {
            id
            name
        } 
    } 
`;

export const teamsQuery = gql`
    {
        teams {
            id
            name
        } 
    } 
`;

export const seasonsQuery = gql`
    {
        seasons {
            id
            name
        } 
    } 
`;

export const playersQuery = gql`
      {
        players {
          id
          name
          height
          weightLbs
          skaterSeasonStats(limit: 5 sort: true) {
              id
              points
              season
            }          
        }
      }    
`;


export const createPlayerMutation = gql`
    mutation ($player: PlayerInput!, $skaterStats: [SkaterStatisticInput]) {
        createPlayer(player: $player, skaterStats: $skaterStats) {
            id name skaterSeasonStats {
            id
            }
        }
    }
`;