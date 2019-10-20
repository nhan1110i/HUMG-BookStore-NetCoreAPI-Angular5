using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class ProductInOrder
    {
        public Product Product { get; set; }
        public OrderDetail OrderDetail { get; set; }
        public ProductInOrder(Product product, OrderDetail orderDetail)
        {
            this.Product = product;
            this.OrderDetail = orderDetail;
        }
    }
}
