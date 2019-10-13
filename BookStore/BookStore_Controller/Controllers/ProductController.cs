using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookStore_Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly Product product = new Product();
        readonly Category category = new Category();
        readonly Author author = new Author();
        readonly PublishingHouse publishing = new PublishingHouse();
        [HttpGet]
        public async Task<JsonResult> GetProducts()
        {
            var Products = await product.GetProducts();
            List<ProductDetail> GetProducts = new List<ProductDetail>();
            foreach (Product product in Products)
            {
                GetProducts.Add(new ProductDetail(product, await author.GetAuthorById(product.AuthorId), await category.GetCategoryById(product.CategoryId), await publishing.GetPublishingHouseById(product.PublishingId)));
            }
            return new JsonResult(GetProducts);
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetProductById(int Id)
        {
            var rs = await product.GetProductById(Id);
            if (rs == null)
            {
                return new JsonResult(new Notice(1, "Not found"));
            }
            else
            {
                return new JsonResult(rs);
            }
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetProductByCategoryId(int Id)
        {
            var rs = await product.GetProductByCategoryId(Id);
            if(rs.Count() == 0)
            {
                return new JsonResult(new Notice(1, "not found product"));
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
            if (rs == 0)
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
            Product productDelete = await product.GetProductById(Id);
            string Image = productDelete.ProductImageList;
            product.DeleteImage(Image);
            var rs = await product.DeleteProducById(Id);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Deleted"));
            }
        }
        [HttpPost]
        public async Task<JsonResult> DeleteProducts([FromBody] int[] products)
        {
            var rs = await product.DeleteProducts(products);
            if (rs == 0)
            {
                return new JsonResult(new Notice(0, "Deleted"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
        }
        [HttpPut("{Id}")]
        public async Task<JsonResult> UpdateProduct([FromBody] Product productUpdate, int Id)
        {
            int rs = await product.UpdateProduct(productUpdate, Id);
            if (rs == 0)
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