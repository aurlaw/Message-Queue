using Microsoft.Azure.ServiceBus;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SBSender
{

    public class Sender
    {

       private readonly string _sbendPoint;
        private readonly string _queueName;
        private readonly IQueueClient _queueClient;

        public Sender(string endPoint, string queueName) 
        {
            _sbendPoint = endPoint;
            _queueName = queueName;
            _queueClient = new QueueClient(_sbendPoint, queueName);
        }
        public async Task SendMessagesAsync(int numberOfMessagesToSend)
        {
            try
            {
                for (var i = 0; i < numberOfMessagesToSend; i++)
                {
                    // Create a new message to send to the queue
                    string messageBody = $"Message {i}";
                    var message = new Message(Encoding.UTF8.GetBytes(messageBody));
                    message.SessionId = "LB1";
                    // Write the body of the message to the console
                    Console.WriteLine($"Sending message: {messageBody}");

                    // Send the message to the queue
                    await _queueClient.SendAsync(message);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine($"{DateTime.Now} :: Exception: {exception.Message}");
            }
        }

        public async Task Close() 
        {
            await _queueClient.CloseAsync();
        }

    }
}