using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class CheckOut
    {
        public Customer Customer { get; set; }
        public Order Order { get; set; }
        public List<OrderDetail> OrderDetail { get; set; }
    }
}
