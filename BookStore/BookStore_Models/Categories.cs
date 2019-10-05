using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Categories
    {
        public Categories()
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
        public async Task<IEnumerable<Categories>> GetListCategories()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM Categories";
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Categories>(Query, null, null, null, command);
                return rs;
            }
        }
    }
}
