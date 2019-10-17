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
                
            var Categories = await category.GetCategories();
            List<CategoryDetail> ListCategory = new List<CategoryDetail>();
            foreach(Category category in Categories)
            {
                ListCategory.Add(new CategoryDetail(category, await parentCategory.GetParentCategoryById(category.ParentId)));
            }
            return new JsonResult(ListCategory);
        }
        [HttpPost]
        public async Task<JsonResult> AddCategory([FromBody] Category category)
        {
            int rs = await category.AddCategory(category);
            if(rs == 1)
            {
                return new JsonResult(new Notice(0, "Add Category Ok"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Cant Add Category"));
            }
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteCategory(int Id)
        {
            int rs = await category.DeleteCategory(Id);
            if(rs == 1)
            {
                return new JsonResult(new Notice(0, "Delete ok"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Delete not ok"));
            }
        }
        [HttpPut]
        public async Task<JsonResult> UpdateCategory([FromBody] Category category)
        {
            int rs = await category.UpdateCategory(category);
            if(rs == 1)
            {
                return new JsonResult(new Notice(0, "Update ok"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Update not ok"));
            }
        }
    }
} 