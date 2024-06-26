using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_EventManagement.Model;

namespace Backend_EventManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly EventContext _context;

        public CategoriesController(EventContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblCategories>>> GetTblCategories()
        {
            return await _context.TblCategories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblCategories>> GetTblCategories(int id)
        {
            var tblCategories = await _context.TblCategories.FindAsync(id);

            if (tblCategories == null)
            {
                return NotFound();
            }

            return tblCategories;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblCategories(int id, TblCategories tblCategories)
        {
            if (id != tblCategories.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblCategories).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCategoriesExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblCategories>> PostTblCategories(TblCategories tblCategories)
        {
            _context.TblCategories.Add(tblCategories);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblCategories", new { id = tblCategories.Id }, tblCategories);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblCategories(int id)
        {
            var tblCategories = await _context.TblCategories.FindAsync(id);
            if (tblCategories == null)
            {
                return NotFound();
            }

            _context.TblCategories.Remove(tblCategories);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCategoriesExists(int id)
        {
            return _context.TblCategories.Any(e => e.Id == id);
        }
    }
}
