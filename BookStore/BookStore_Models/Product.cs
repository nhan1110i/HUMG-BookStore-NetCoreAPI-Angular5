using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
namespace BookStore_Models
{
    public class Product
    {
        public Product()
        {
            Id = CategoryId = AuthorId = PublishingId = ViewCount = RateCount = RateTotal = 0;
            ProductPrice = ProductDiscount = PublishYear = 0;
            ProductCode = ProductName = Translator = String.Empty;
            CreateAt = UpdateAt = DateTime.Now;

        }
        public Product(int Id, string ProductCode, string ProductName, float ProductPrice, float ProductDiscount, string ProductDescription, string ProductImageList, string ProductTitle, int CategoryId, int AuthorId, int ViewCount, int RateCount, int RateTotal, bool IsActive, float PublishYear, string Tranlator, DateTime CreateAt, DateTime UpdateAt)
        {
            this.Id = Id;
            this.ProductName = ProductName;
            this.ProductCode = ProductCode;
            this.ProductPrice = ProductPrice;
            this.ProductDiscount = ProductDiscount;
            this.ProductDescription = ProductDescription;
            this.ProductImageList = ProductImageList;
            this.ProductTitle = ProductTitle;
            this.CategoryId = CategoryId;
            this.AuthorId = AuthorId;
            this.PublishingId = PublishingId;
            this.ViewCount = ViewCount;
            this.RateCount = RateCount;
            this.ViewCount = ViewCount;
            this.RateTotal = RateTotal;
            this.IsActive = IsActive;
            this.PublishYear = PublishYear;
            this.Translator = Translator;
            this.CreateAt = CreateAt;
            this.UpdateAt = UpdateAt;

        }
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public float ProductPrice { get; set; }
        public float ProductDiscount { get; set; }
        public string ProductDescription { get; set; }
        public string ProductImageList { get; set; }
        public string ProductTitle { get; set; }
        public int CategoryId { get; set; }
        public int AuthorId { get; set; }
        public int PublishingId { get; set; }
        public int ViewCount { get; set; }
        public int RateCount { get; set; }
        public int RateTotal { get; set; }
        public bool IsActive { get; set; }
        public float PublishYear { get; set; }
        public string Translator { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        // function
        public async Task<List<Product>> GetProducts()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM product";
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Product>(Query, null, null, null, command);
                return rs.ToList();
            }
        }
        
        public async Task<Product> GetProductById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM product WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Product>(Query, param, null, null, command);
                return rs.FirstOrDefault();
            }
        }
        public async Task<int> InsertProduct(Product product)
        {
            using (DataConnection.Connection())
            {
                var insertId = 0;
                string Query = "INSERT INTO Product VALUES (@ProductCode,@ProductName,@ProductPrice,@ProductDiscount,@ProductDescription,@ProductImageList,@ProductTitle,@CategoryId,@AuthorId,@PublishingId,@ViewCount,@RateCount,@RateTotal,@IsActive,@PublishYear,@Translator,@CreateAt,@UpdateAt);SELECT CAST(SCOPE_IDENTITY() as int)";
                var param = new DynamicParameters();
                param.Add("@Productcode", product.ProductCode);
                param.Add("@ProductName", product.ProductName);
                param.Add("@ProductPrice", product.ProductPrice);
                param.Add("@ProductDiscount", product.ProductDiscount);
                param.Add("@ProductDescription", product.ProductDescription);
                param.Add("@ProductImageList", product.ProductImageList);
                param.Add("@ProductTitle", product.ProductImageList);
                param.Add("@CategoryId", product.CategoryId);
                param.Add("@AuthorId", product.AuthorId);
                param.Add("@PublishingId", product.PublishingId);
                param.Add("@ViewCount", product.ViewCount);
                param.Add("@RateCount", product.RateCount);
                param.Add("@RateTotal", product.RateTotal);
                param.Add("@IsActive", product.IsActive);
                param.Add("@PublishYear", product.PublishYear);
                param.Add("@Translator", product.Translator);
                param.Add("@CreateAt", DateTime.Now);
                param.Add("@UpdateAt", DateTime.Now);
                CommandType command = CommandType.Text;
                insertId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return insertId;
            }


        }
        public async Task<int> DeleteProducById(int Id)
        {
            using (DataConnection.Connection())
            {
                var deleteID = 0;
                var Query = "DELETE FROM Product WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType command = CommandType.Text;
                deleteID = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return deleteID;

            }
        }
        public void DeleteImage(string image)
        {
            string FilePath = @"D:/_TN94/Chuyên đề/BTL/BookStore/BookStore_Controller/wwwroot/Assets/Admin/Products/" + image;
            File.Delete(FilePath);
        }
        public async Task<int> UpdateProduct(Product product)
        {
            using (DataConnection.Connection())
            {
                var IdUpdate = 0;
                string Query = "UPDATE Product SET ProductCode = @ProductCode, ProductName = @ProductName,ProductPrice = @ProductPrice, ProductDiscount = @ProductDiscount,ProductDescription = @ProductDescription,ProductImageList = @ProductImageList,ProductTitle = @ProductTitle,CategoryId = @CategoryId,AuthorId = @AuthorId,PublishingId = @PublishingId,ViewCount = @ViewCount,RateCount = @RateCount,RateTotal = @RateTotal,IsActive = @IsActive,PublishYear = @PublishYear,Translator = @Translator,UpdateAt = @UpdateAt WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Productcode", product.ProductCode);
                param.Add("@ProductName", product.ProductName);
                param.Add("@ProductPrice", product.ProductPrice);
                param.Add("@ProductDiscount", product.ProductDiscount);
                param.Add("@ProductDescription", product.ProductDescription);
                param.Add("@ProductImageList", product.ProductImageList);
                param.Add("@ProductTitle", product.ProductTitle);
                param.Add("@CategoryId", product.CategoryId);
                param.Add("@AuthorId", product.AuthorId);
                param.Add("@PublishingId", product.PublishingId);
                param.Add("@ViewCount", product.ViewCount);
                param.Add("@RateCount", product.RateCount);
                param.Add("@RateTotal", product.RateTotal);
                param.Add("@IsActive", product.IsActive);
                param.Add("@PublishYear", product.PublishYear);
                param.Add("@Translator", product.Translator);
                param.Add("@UpdateAt", DateTime.Now);
                param.Add("@Id", product.Id);
                CommandType command = CommandType.Text;
                IdUpdate = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return IdUpdate;
            }
        }
        public async Task<List<Product>> GetProductByCategoryId(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM product WHERE CategoryId = @id";
                var param = new DynamicParameters();
                param.Add("@id",Id);
                CommandType comm = CommandType.Text;
                var rs= await DataConnection.Connection().QueryAsync<Product>(Query, param, null, null, comm);
                return rs.ToList();
            }
        }
        public async Task<List<Product>> GetNumberProductsByCategory(int Id)
        {
            string Query = "SELECT * FROM dbo.Product WHERE CategoryId = @Id ORDER BY CreateAt DESC";
            var param = new DynamicParameters();
            //param.Add("@nop", nop);
            param.Add("@Id", Id);
            CommandType c = CommandType.Text;
            var rs = await DataConnection.Connection().QueryAsync<Product>(Query, param, null, null, c);
            return rs.ToList();
        }
        public async Task<int> DeleteProducts(int [] Id)
        {
            foreach(int id in Id)
            {
                using (DataConnection.Connection())
                {
                    var rs = await DeleteProducById(id);
                }
            }
            return 0;
        }
        public async Task<int> ActiveProducts(int [] Id)
        {
            using (DataConnection.Connection())
            {
                 foreach (int id in Id)
                {
                    string Query = "UPDATE Product SET IsActive = True WHERE Id = @Id";
                    var param = new DynamicParameters();
                    param.Add("@Id", id);
                    CommandType com = CommandType.Text;
                    await DataConnection.Connection().ExecuteAsync(Query, param, null, null, com);
                }
                return 0;
            }
        }
        public async Task<int> DuplicateProducts(int [] Id)
        {
            foreach(int id in Id)
            {
                Product product = await GetProductById(id);
                await InsertProduct(product);
            }
            return 0;
        }
    }
}
