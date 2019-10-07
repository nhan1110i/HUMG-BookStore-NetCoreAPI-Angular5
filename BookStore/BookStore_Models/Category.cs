using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Category
    {
        public Category()
        {
            Id = ParentId = SortOrder = 0;
            CategoryName = CategoryTitle = "";
            IsActive = true;
        }
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryTitle { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; }
        public async Task<List<Category>> GetCategories()
        {
            using (DataConnection.Connection())
            {
               // IEnumerable<ParentCategory> rs = new IEnumerable<ParentCategory>();
                string Query = "SELECT * FROM Category";
                CommandType command = CommandType.Text;
                var categories = await DataConnection.Connection().QueryAsync<Category>(Query, null, null, null, command);
                return categories.ToList();
            }
        }
        public async Task<Category> GetCategoryById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM Category WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Category>(Query, param, null, null, command);
                return rs.Single();
            }
        } 
        public async Task<int> AddCategory(Category category)
        {
            using (DataConnection.Connection())
            {
                var insertId = 0;
                string Query = "INSERT INTO Category VALUES (@ParentId,@CategoryName,@CategoryTitle,@SortOrder,@IsActive)";
                var param = new DynamicParameters();
                param.Add("@ParentId", category.ParentId);
                param.Add("@CategoryName", category.CategoryName);
                param.Add("@CategoryTitle", category.CategoryTitle);
                param.Add("@SortOrder", category.SortOrder);
                param.Add("@IsActive", category.IsActive);
                CommandType command = CommandType.Text;
                insertId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return insertId;
            }
        }
        public async Task<int> DeleteCategory(int Id)
        {
            var deleteId = 0;
            string Query = "DELETE Category WHERE Id = @Id";
            var param = new DynamicParameters();
            param.Add("@Id", Id);
            CommandType command = CommandType.Text;
            deleteId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
            return deleteId;
        }
        public async Task<int> UpdateCategory(Category category)
        {
            using (DataConnection.Connection())
            {
                var updateId = 0;
                string Query = "UPDATE Category SET ParentId = @ParentId,CategoryName = @CategoryName,CategoryTitle = @CategoryTitle,SortOrder = @SortOrder,IsActive = @IsActive WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id",category.Id);
                param.Add("@ParentId", category.ParentId);
                param.Add("@CategoryName", category.CategoryName);
                param.Add("@CategoryTitle", category.CategoryTitle);
                param.Add("@SortOrder", category.SortOrder);
                param.Add("@IsActive", category.IsActive);
                CommandType command = CommandType.Text;
                updateId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return updateId;
            }
        }
    }
}
