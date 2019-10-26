using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Log
    {
        public int Id { get; set; }
        public string UserLog { get; set; }
        public string Action { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
