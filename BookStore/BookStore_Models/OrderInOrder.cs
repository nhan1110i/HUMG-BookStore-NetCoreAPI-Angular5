using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class OrderInOrder
    {
        public CustomerInOrder CustomerInOrder { get; set; }
        public Order Order { get; set; }
        public List<ProductInOrder> ProductInOrder { get; set; }
        public OrderInOrder(CustomerInOrder customerInOrder, Order order, List<ProductInOrder> productInOrder)
        {
            this.CustomerInOrder = customerInOrder;
            this.Order = order;
            this.ProductInOrder = productInOrder;
        }
    }
}
