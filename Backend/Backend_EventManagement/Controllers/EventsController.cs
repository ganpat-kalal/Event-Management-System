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
        public async Task<ActionResult<IEnumerable<TblEvents>>> GetTblEvent()
        {
            // return await _context.TblEvents.ToListAsync();
            var getevent = (from e in _context.TblEvents
                        join u in _context.TblUsers
                        on e.UserId equals u.Id
                        join c in _context.TblCategories
                        on e.CategoryId equals c.Id

                        select new TblEvents
                        {
                            Id = e.Id,
                            Name = e.Name,
                            StartDate = e.StartDate,
                            EndDate = e.EndDate,
                            Location = e.Location,
                            Description = e.Description,
                            Attendees = e.Attendees,
                            UserId = e.UserId,
                            CategoryId = e.CategoryId,
                        }
                 ).ToListAsync();

            return await getevent;
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblEvents>> GetTblEvent(int id)
        {
            var tblEvent = await _context.TblEvents.FindAsync(id);

            if (tblEvent == null)
            {
                return NotFound();
            }

            return tblEvent;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblEvent(int id, TblEvents tblEvent)
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
        public async Task<ActionResult<TblEvents>> PostTblEvent(TblEvents tblEvent)
        {
            _context.TblEvents.Add(tblEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblEvent", new { id = tblEvent.Id }, tblEvent);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblEvent(int id)
        {
            var tblEvent = await _context.TblEvents.FindAsync(id);
            if (tblEvent == null)
            {
                return NotFound();
            }

            _context.TblEvents.Remove(tblEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblEventExists(int id)
        {
            return _context.TblEvents.Any(e => e.Id == id);
        }
    }
}
