using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_EventManagement.Model;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend_EventManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventContext _context;

        public EventsController(EventContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblEvent>>> GetTblEvent()
        {
            // return await _context.TblEvent.ToListAsync();
            var getevent = (from e in _context.TblEvent
                        join u in _context.TblUser
                        on e.UserId equals u.Id

                        select new TblEvent
                        {
                            Id = e.Id,
                            Name = e.Name,
                            Date = e.Date,
                            Location = e.Location,
                            Description = e.Description,
                            Attendees = e.Attendees,
                            UserId = e.UserId,
                        }
                 ).ToListAsync();

            return await getevent;
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblEvent>> GetTblEvent(int id)
        {
            var tblEvent = await _context.TblEvent.FindAsync(id);

            if (tblEvent == null)
            {
                return NotFound();
            }

            return tblEvent;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblEvent(int id, TblEvent tblEvent)
        {
            if (id != tblEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblEventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblEvent>> PostTblEvent(TblEvent tblEvent)
        {
            _context.TblEvent.Add(tblEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblEvent", new { id = tblEvent.Id }, tblEvent);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblEvent(int id)
        {
            var tblEvent = await _context.TblEvent.FindAsync(id);
            if (tblEvent == null)
            {
                return NotFound();
            }

            _context.TblEvent.Remove(tblEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblEventExists(int id)
        {
            return _context.TblEvent.Any(e => e.Id == id);
        }
    }
}
