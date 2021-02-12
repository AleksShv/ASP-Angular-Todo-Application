using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using WebAPI.AuthenticationServer.Models;
using WebAPI.TokenApp;

namespace WebAPI.AuthenticationServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IOptions<AuthOptions> _authOptions;

        public AuthController(ApplicationContext context, IOptions<AuthOptions> authOptions)
        {
            _context = context;
            _authOptions = authOptions;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(Login request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new { access_token = token });
            }

            return Unauthorized();
        }

        private Account AuthenticateUser(string email, string password)
        {
            var user = _context.Accounts.FirstOrDefault(u => u.Email == email);

            if (user != null && BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password))
            {
                return user;
            }

            return null;
        }

        private string GenerateJWT(Account user)
        {
            var authParams = _authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("registration")]
        public IActionResult Registration(Account user)
        {
            if (ModelState.IsValid)
            {
                if (_context.Accounts.SingleOrDefault(u => u.Email == user.Email) == null)
                {
                    user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);

                    _context.Accounts.Add(user);
                    _context.SaveChanges();

                    return Ok(user);
                }

                return Conflict("This user is already registered");
            }

            return BadRequest(ModelState);
        }
    }
}
