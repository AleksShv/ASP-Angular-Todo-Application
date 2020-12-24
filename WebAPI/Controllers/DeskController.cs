using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/desk")]
    public class DeskController : Controller
    {
        private ApplicationContext _db;

        public DeskController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet("{id}")]
        public async Task<Desk> GetItem(int id)
        {
            var item = await _db.Desk.FirstOrDefaultAsync(i => i.Id == id);
            return item;
        }

        [HttpGet]
        public async Task<IEnumerable<Desk>> GetAllItems()
        {
            return await _db.Desk.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(Desk item)
        {
            if (ModelState.IsValid)
            {
                await _db.Desk.AddAsync(item);
                await _db.SaveChangesAsync();
                return Ok();
            }

            return BadRequest(ModelState);
        }

        [HttpPost("complete/{id}")]
        public  async Task SetCompleted(int id)
        {
            var item = await _db.Desk.FirstOrDefaultAsync(i => i.Id == id);
            item.Completed = !item.Completed;
            _db.Entry(item).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteItem(int id)
        {
            var item = await _db.Desk.FirstOrDefaultAsync(i => i.Id == id);

            if (item != null)
            {
                _db.Desk.Remove(item);
                await _db.SaveChangesAsync();
            }
        }

        [HttpPost("delete/")]
        public async Task DeleteItems(IEnumerable<Desk> items)
        {
            _db.Desk.RemoveRange(items);
            await _db.SaveChangesAsync();
        }
    }
}
