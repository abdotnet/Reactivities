using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.Persistence;

namespace Reactivities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var values = await _context.Values.ToListAsync();

            return Ok(values);

        }

        [HttpGet("{id}")]
        public async  Task<IActionResult> Get(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(c=>c.Id ==  id);

            return Ok(value);

        }

    }
}
