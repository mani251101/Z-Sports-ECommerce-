using feedbackform;
using Microsoft.AspNetCore.Mvc;
using userfeedback;

namespace userfeedbackform
{
  [Route("api/[controller]")]
  [ApiController]
  public class FeedbackController : ControllerBase
  {
    private readonly FeedbackDbContext _context;
    public FeedbackController(FeedbackDbContext context)
    {
      _context = context;
    }

    [HttpGet("alluserfeedback")]
    public ActionResult<IEnumerable<Feedback>> getAllFeedback()
    {
      var userfeedback = _context.feedback.ToList();
      return Ok(userfeedback);
    }

    [HttpPost("addfeedback")]
    public ActionResult postFeedback(Feedback users)
    {
      _context.Add(users);
      _context.SaveChanges();
      return Ok(users);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> deleteSportsProduct(int id)
    {
      var userfeedback = await _context.feedback.FindAsync(id);
      if (userfeedback == null)
      {
        return NotFound();
      }
       _context.feedback.Remove(userfeedback);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
