using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend_EventManagement.Model
{
    public class AuthService
    {
        private readonly EventContext _context;

        public AuthService(EventContext context)
        {
            _context = context;
        }

        public async Task<TblUsers> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _context.TblUsers.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exists");
            }

            var user = new TblUsers
            {
                Username = request.Username,
                Email = request.Email,
                Password = HashPassword(request.Password)
            };

            _context.TblUsers.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<TblUsers> AuthenticateAsync(LoginRequest request)
        {
            var user = await _context.TblUsers.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !VerifyPassword(request.Password, user.Password))
            {
                throw new Exception("Invalid credentials");
            }

            return user;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            var hash = HashPassword(password);
            return hash == storedHash;
        }
    }
}
