using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public String Title { get; set; }
            public String Description { get; set; }
            public String Category { get; set; }
            public DateTime Date { get; set; }
            public String City { get; set; }
            public String Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activities = new Activity()
                {
                    Category = request.Category,
                    City = request.City,
                    Date = request.Date,
                    Description = request.Description,
                    Id = request.Id,
                    Title = request.Title,
                    Venue = request.Venue
                };

                context.Activities.Add(activities);

                var status = await context.SaveChangesAsync() > 0;

                if (status) return Unit.Value;

                throw new Exception("Problem saving changes");

                     
            }
        }

    }
}
