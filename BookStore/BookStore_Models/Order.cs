using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderCode { get; set; }
        public int TotalQuantity { get; set; }
        public float TotalMoney { get; set; }
        public int PaymentId { get; set; }
        public int StatusId { get; set; }
    }
}
