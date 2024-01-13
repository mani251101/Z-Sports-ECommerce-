using address;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using users;

namespace useraddress
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserAddressController : ControllerBase
  {
    private readonly UserAddressDbContext _context;
    public UserAddressController(UserAddressDbContext context)
    {
      _context = context;
    }

    [HttpGet("alluseraddress")]
    public ActionResult<IEnumerable<UserDetail>> getAllAddress()
    {
      var alladdress = _context.address.ToList();
      return Ok(alladdress);
    }

    [HttpGet("AddressByUserid")]
    public async Task<ActionResult<IEnumerable<UserDetail>>> getAddressById(int id)
    {
      var useraddress = await _context.address.Where(user=>user.userId == id).ToListAsync();
      return useraddress;
    }

    [HttpPost]
    public ActionResult<IEnumerable<UserDetail>> postAddress(UserDetail details)
    {
      _context.Add(details);
      _context.SaveChanges();
      return Ok(details);
    }

    [HttpDelete("{id}")]
        public async Task<IActionResult> deleteAddress(int id)
        {
            var useraddress = await _context.address.FindAsync(id);
            if (useraddress == null)
            {
                return NotFound();
            }

            _context.address.Remove(useraddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("getaddressbyaddressid")]
        public ActionResult getAddressByAddressId(int addressid)
        {
          var useraddress = _context.address.FirstOrDefault(address=>address.addressId == addressid);
          return Ok(useraddress);
        }
  }
}
