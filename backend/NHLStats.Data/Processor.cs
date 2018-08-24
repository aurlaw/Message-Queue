using NHLStats.Core;
using NHLStats.Core.Models;
using System;
namespace NHLStats.Data
{
    public class Processor : IProcessor
    {
        public void Process(Player player)
        {
            Console.WriteLine($"processed player {player.Name}");
        }
    }
}