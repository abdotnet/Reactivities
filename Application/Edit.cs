using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Reactivities.Persistence;

namespace Reactivities.Application
{
    public class Edit
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
                var activity = await context.Activities.FindAsync(request.Id);

                if (activity == null) throw new Exception("COuld not find activities");


                activity.Category = request.Category ?? activity.Category;
                activity.City = request.City ?? activity.City;
                activity.Date = request.Date== null ? activity.Date : request.Date;
                activity.Description = request.Description ?? activity.Description;
               // activity.Id = request.Id;
                activity.Title = request.Title ?? activity.Title;
                activity.Venue = request.Venue ?? activity.Venue;


               // context.Activities.Add(activities);

                var status = await context.SaveChangesAsync() > 0;

                if (status) return Unit.Value;

                throw new Exception("Problem saving changes");


            }
        }

    }
}
