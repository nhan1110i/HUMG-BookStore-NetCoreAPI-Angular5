using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Notice
    {
        public Notice(int Error, string Message)
        {
            this.Error = Error;
            this.Message = Message;
        }
        public int Error { get; set; }
        public string Message { get; set; }
    }
}
