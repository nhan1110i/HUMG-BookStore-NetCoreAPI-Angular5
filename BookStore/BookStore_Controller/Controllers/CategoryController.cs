using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookStore_Models;
using BookStore_Controller.Helper;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        Category category = new Category();
        ParentCategory parentCategory = new ParentCategory();
        Product product = new Product();
        [HttpGet]
        public async Task<JsonResult> GetCategories()
        {
            MailService.Send(new Mail("trongnhan1110i@gmail.com","subject","body"));      
            var Categories = await category.GetCategories();
            List<CategoryDetail> ListCategory = new List<CategoryDetail>();
            foreach(Category category in Categories)
            {
                ListCategory.Add(new CategoryDetail(category, await parentCategory.GetParentCategoryById(category.ParentId)));
            }
            return new JsonResult(ListCategory);
        }
        [HttpPost]
        public async Task<int> AddCategory([FromBody] Category category)
        {
            int rs = await category.AddCategory(category);
            return rs;
        }
        [HttpDelete("{Id}")]
        public async Task<int> DeleteCategory(int Id)
        {
            int rs = await category.DeleteCategory(Id);
            return rs;
        }
        [HttpPut]
        public async Task<int> UpdateCategory([FromBody] Category category)
        {
            int rs = await category.UpdateCategory(category);
            return rs;
        }
    }
} 