using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Token
    {
        public int Id { get; set; }
        public string TokenValue { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

    }
}
