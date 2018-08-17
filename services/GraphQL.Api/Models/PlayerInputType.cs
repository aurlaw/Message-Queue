using GraphQL.Types;

namespace GraphQLApi.Models
{
    public class PlayerInputType : InputObjectGraphType
    {
        public PlayerInputType()
        {
            Name = "PlayerInput";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<StringGraphType>("birthPlace");
            Field<StringGraphType>("height");
            Field<IntGraphType>("weightLbs");
            Field<DateGraphType>("birthDate");
        }
        
    }
}