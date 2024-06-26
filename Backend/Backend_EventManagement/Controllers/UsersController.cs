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
    public class UsersController : ControllerBase
    {
        private readonly EventContext _context;
        private readonly AuthService _authService;

        public UsersController(EventContext context)
        {
            _context = context;
            _authService = new AuthService(context);
        }

        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<ActionResult<TblUsers>> Register(RegisterRequest request)
        {
            try
            {
                var user = await _authService.RegisterAsync(request);
                return CreatedAtAction("GetTblUser", new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult<TblUsers>> Login(LoginRequest request)
        {
            try
            {
                var user = await _authService.AuthenticateAsync(request);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblUsers>>> GetTblUser()
        {
            return await _context.TblUsers.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblUsers>> GetTblUser(int id)
        {
            var tblUser = await _context.TblUsers.FindAsync(id);

            if (tblUser == null)
            {
                return NotFound();
            }

            return tblUser;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblUser(int id, TblUsers tblUser)
        {
            if (id != tblUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblUserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblUsers>> PostTblUser(TblUsers tblUser)
        {
            _context.TblUsers.Add(tblUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblUser", new { id = tblUser.Id }, tblUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblUser(int id)
        {
            var tblUser = await _context.TblUsers.FindAsync(id);
            if (tblUser == null)
            {
                return NotFound();
            }

            _context.TblUsers.Remove(tblUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblUserExists(int id)
        {
            return _context.TblUsers.Any(e => e.Id == id);
        }
    }
}
