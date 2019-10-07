using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class CategoryDetail
    {
        public int Id { get; set; }
        public Category Category { get; set; }
        public ParentCategory ParentCategory { get; set; }
        public CategoryDetail(Category category, ParentCategory parentCategory)
        {
            this.Category = category;
            this.ParentCategory = parentCategory;
        }
    }
}
