using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.ResurceServer.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set;}

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public bool Completed { get; set; }
        public bool Changed { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime CompleteDate { get; set; }

        public int UserId { get; set; }

        public Note()
        {
            Completed = false;
            Changed = false;
            CreateDate = DateTime.Now;
            CompleteDate = DateTime.MinValue;
        }
    }
}
