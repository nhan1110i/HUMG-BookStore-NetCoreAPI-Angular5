using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookStore_Models;
namespace BookStore_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly Product product = new Product();
        [HttpGet]
        public async Task<JsonResult> GetListProduct()
        {
            return new JsonResult(await product.GetListProduct());
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetProductById(int Id)
        {
            var rs = await product.GetProductById(Id);
            if(rs == null)
            {
                return new JsonResult(new Notice(1, "Not found"));
            }
            else
            {
                return new JsonResult(rs);
            }
        }
        [HttpPost]
        public async Task<JsonResult> InsertProduct([FromBody] Product product)
        {
            var rs = await product.InsertProduct(product);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Insert"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Insert Complete"));
            }
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteProductById(int Id)
        {
            var rs = await product.DeleteProducById(Id);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Deleted"));
            }
        }
        [HttpPut("{Id}")]
        public async Task<JsonResult> UpdateProduct([FromBody] Product productUpdate, int Id)
        {
            int rs = await product.UpdateProduct(productUpdate, Id);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }

    }

}