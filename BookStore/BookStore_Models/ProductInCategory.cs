using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class ProductInCategory
    {
        public List<Product>  Products { get; set; }
        public Category Category { get; set; }
        public ProductInCategory(List<Product> products, Category category)
        {
            this.Products = products;
            this.Category = category;
        }
    }
}
