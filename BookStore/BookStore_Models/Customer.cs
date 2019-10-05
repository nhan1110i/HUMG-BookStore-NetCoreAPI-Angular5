using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerMail { get; set; }
        public string CustomerAddress { get; set; }
        public int TotalOrder { get; set; }
        public int TotalOrderComplete { get; set; }
        public int TotalOrderCancel { get; set; }

    }
}
