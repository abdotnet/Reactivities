using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Persistence;

namespace Reactivities.Application
{
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(c => c.Id == request.Id);

                _context.Activities.Remove(activity);
               var status = _context.SaveChanges() > 0;

                if (status) return Unit.Value;

                throw new Exception("Exception found")  ;
            }
        }
    }
}
