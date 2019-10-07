using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    
    public class ParentCategoryController : ControllerBase
    {
        ParentCategory parentCategory = new ParentCategory();

        // GET: api/ParentCategory
        [HttpGet]
        public async Task<JsonResult> GetParentCategories()
        {
            var ParentCategories = await parentCategory.GetParentCategories();
            return new JsonResult(ParentCategories);
        }

        
    }
}
