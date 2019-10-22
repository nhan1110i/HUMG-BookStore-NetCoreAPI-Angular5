using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class ParentCategory
    {
        public int Id { get; set; }
        public string ParentName { get; set; }
        public async Task<ParentCategory> GetParentCategoryById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM ParentCategory WHERE Id = @Id";
                CommandType command = CommandType.Text;
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                var rs = await DataConnection.Connection().QueryAsync<ParentCategory>(Query, param, null, null, command);
                return rs.FirstOrDefault();
            }
        }
        public async Task<List<ParentCategory>> GetParentCategories()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM ParentCategory";
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<ParentCategory>(Query, null, null, null, command);
                return rs.ToList();
            }
        }
        public ParentCategory()
        {
            this.Id = 0;
            this.ParentName = "";
        }
    }
    
}
