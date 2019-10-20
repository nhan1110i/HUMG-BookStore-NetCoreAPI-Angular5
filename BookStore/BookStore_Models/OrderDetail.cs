using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
        public async Task<List<OrderDetail>> GetOrderDetailByOrderId(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM OrderDetail WHERE OrderId = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<OrderDetail>(Query, param, null, null, c);
                return rs.ToList();
            }
        }
    }
}
