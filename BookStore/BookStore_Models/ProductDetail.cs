using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class ProductDetail
    {
        public Product Product { get; set; }
        public Author Author { get; set; }
        public Category Category { get; set; }
        public PublishingHouse PublishingHouse { get; set; }
        public ProductDetail(Product product, Author author, Category category, PublishingHouse publishingHouse)
        {
            this.Product = product;
            this.Author = author;
            this.Category = category;
            this.PublishingHouse = publishingHouse;
        }
    }
}
