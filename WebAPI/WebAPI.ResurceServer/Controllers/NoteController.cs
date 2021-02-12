using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ResurceServer.Models;
using System;

namespace WebAPI.ResurceServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NoteController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        public NoteController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Note> GetItem(int id)
        {
            var item = await _context.Notes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == UserId);
            return item;
        }

        [HttpGet]
        public async Task<IEnumerable<Note>> GetAllItems()
        {
            return await _context.Notes
                .Where(n => n.UserId == UserId)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(Note item)
        {
            if (ModelState.IsValid)
            {
                item.UserId = UserId;

                await _context.Notes.AddAsync(item);
                await _context.SaveChangesAsync();
                return Ok(item);
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> ChangeItem(Note item)
        {
            var changeItem = await _context.Notes.FirstOrDefaultAsync(i => i.Id == item.Id && i.UserId == UserId);

            if (changeItem != null)
            {
                changeItem = item;
                changeItem.Changed = true;
                _context.Entry(changeItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(changeItem);
            }

            return NotFound();
        }

        [HttpPost]
        [Route("complete/{id}")]
        public async Task<IActionResult> SetCompleted(int id)
        {
            var item = await _context.Notes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == UserId);

            if (item != null)
            {
                item.Completed = !item.Completed;
                item.CompleteDate = DateTime.Now;
                _context.Entry(item).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(item);
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Notes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == UserId);

            if (item != null)
            {
                _context.Notes.Remove(item);
                await _context.SaveChangesAsync();

                return Ok(item);
            }

            return NotFound();
        }

        [HttpPost]
        [Route("delete/")]
        public async Task DeleteItems(IEnumerable<Note> items)
        {
            _context.Notes.RemoveRange(items);
            await _context.SaveChangesAsync();
        }
    }
}
