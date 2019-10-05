using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class New
    {
        public int Id { get; set; }
        public string NewTitle { get; set; }
        public string NewContent { get; set; }
        public string NewImage { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
