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
        public async Task<int> InsertListOrderDetail(List<OrderDetail> orderDetails)
        {
            using (DataConnection.Connection())
            {
                foreach(OrderDetail orderDetail in orderDetails)
                {
                    string Query = "INSERT INTO OrderDetail VALUES (@OrderId, @ProductId, @ProductQuantity)";
                    var pa = new DynamicParameters();
                    pa.Add("@OrderId", orderDetail.OrderId);
                    pa.Add("@ProductId", orderDetail.ProductId);
                    pa.Add("@ProductQuantity", orderDetail.ProductQuantity);
                    CommandType c = CommandType.Text;
                    var rs = await DataConnection.Connection().ExecuteAsync(Query, pa, null, null, c);
                }
            }
            return 1;
        }
    }
}
