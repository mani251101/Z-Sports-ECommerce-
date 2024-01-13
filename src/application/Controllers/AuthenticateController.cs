using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using apijwt;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using userlogin;
using Userregister;

namespace jwt.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        public readonly AuthenticateDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticateController(IConfiguration configuration, AuthenticateDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Register>> register(Register requests)
        {
            createPasswordHash(requests.password, out byte[] passwordHash, out byte[] passwordSalt);

            //assign the values
            var emp = new Register()
            {
                userId = requests.userId,
                firstName = requests.firstName,
                lastName = requests.lastName,
                mobile = requests.mobile,
                email = requests.email,
                password = requests.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt,
                myCarts = requests.myCarts
            };

            await _context.registers.AddAsync(emp);
            _context.SaveChanges();
            return Ok(new {Message = "Registered Successfully"});
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> login(Login login)
        {
            var userexit = await _context.registers.FirstOrDefaultAsync(e=>e.email == login.email);
            if(userexit==null)
            {
                return BadRequest("User not found");
            }
            var emp = userexit;

            if(!verifyPasswordHash(login.password, emp.passwordHash,emp.passwordSalt))
            {
                return BadRequest("Password not vaild");
            }
            var Token = createToken(emp);
            return Ok(new {Message = Token});
        }

        private string createToken(Register login)
         {
            if(login.email == "admin123@gmail.com" && login.password == "admin@123")
            {
                List<Claim>claim = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,login.email),
                    new Claim(ClaimTypes.Role,"admin")
                };
                var keys = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
                var credentials = new SigningCredentials(keys,SecurityAlgorithms.HmacSha512Signature);
                var tokens = new JwtSecurityToken(claims:claim,expires:DateTime.Now.AddDays(1),signingCredentials:credentials);
                var jwts = new JwtSecurityTokenHandler().WriteToken(tokens);
                return jwts;
            }
            else
            {
                //collection of claim objects
            List<Claim>claims=new List<Claim>()
            {
                  new Claim(ClaimTypes.Name,login.email),
                  new Claim(ClaimTypes.Role,"user")
            };

                //converts a string value to a byte array using the UTF-8 encoding.
                //Appsettings retrieve the values from appsettings.Token
                var key= new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                //secure algorithm for generating digital signatures using a secret key
                var credentials1=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

                var token=new JwtSecurityToken(claims:claims,expires:DateTime.Now.AddMinutes(1),signingCredentials:credentials1);

                //Compact serialized format of token
                var jwt=new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
         }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }

        [HttpGet]
        public async Task<IActionResult>getAllUsers()
        {
          var users = await _context.registers.Include(e=>e.myCarts).ToListAsync();
          return Ok(users);
        }

        [HttpPatch]
        [Route("{id:int}/user")]
        public ActionResult patchUser(int id, [FromBody]JsonPatchDocument<Register> user)
        {
          if (user==null && id<=0)
          {
            return BadRequest();
          }
         var userdetails = _context.registers.Include(myuser => myuser.myCarts).Where(myuser=>myuser.userId == id).FirstOrDefault();
         if(userdetails==null)
         {
            return NotFound();
         }
          user.ApplyTo(userdetails);
          _context.SaveChangesAsync();
          return NoContent();
        }

      [HttpDelete("{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            if (id < 1)
            {
              return BadRequest();
            }
            var product = await _context.registers.FindAsync(id);
            if (product == null)
            {
              return NotFound();
            }
            _context.registers.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>updateCart(int id,Register user)
        {
          createPasswordHash(user.password, out byte[] passwordHash, out byte[] passwordSalt);

          var userdetails = _context.registers.FirstOrDefault(user => user.userId == id);
          if (userdetails == null)
          {
            return NotFound();
          }
          userdetails.firstName = user.firstName;
          userdetails.lastName = user.lastName;
          userdetails.mobile = user.mobile;
          userdetails.email = user.email;
          userdetails.password = user.password;
          userdetails.passwordHash = passwordHash;
          userdetails.passwordSalt = passwordSalt;

          _context.registers.Update(userdetails);
          await _context.SaveChangesAsync();
          return Ok();
       }

       [HttpGet("{email}")]
       public ActionResult<Register> getEmailByEmailId(string email)
       {
        var useremail = _context.registers.Include(cart=>cart.myCarts).FirstOrDefault(e=>e.email == email);
        return useremail;
       }

       [HttpGet("{id:int}")]
       public ActionResult<Register> getUserById(int id)
       {
        var getuserbyId = _context.registers.Include(cart=>cart.myCarts).FirstOrDefault(findusers=>findusers.userId == id);
        return getuserbyId;
       }
    }
}
