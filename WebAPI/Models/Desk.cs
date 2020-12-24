using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Desk
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }

        public bool Completed { get; set; }
        public string Date { get; set; }

        public Desk()
        {
            Completed = false;
            Date = DateTime.Now.ToShortDateString();
        }
    }
}
