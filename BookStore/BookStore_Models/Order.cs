using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderCode { get; set; }
        public int TotalQuantity { get; set; }
        public float TotalMoney { get; set; }
        public int PaymentId { get; set; }
        public int StatusId { get; set; }
        public int CustomerId { get; set; }
        public async Task<List<Order>> GetOrders()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM [ORDER]";
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Order>(Query, null, null, null, c);
                return rs.ToList();
            }
        }
        public async Task<int> UpdateOrder(int Id, int status)
        {
            using (DataConnection.Connection())
            {
                var idUpdate = 0;
                string Query = "UPDATE [Order] SET StatusId = @Status WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Status", status);
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                idUpdate = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, c);
                return idUpdate;
            }
        }
        public async Task<int> DeleteOrder(int Id)
        {
            using (DataConnection.Connection())
            {
                var idDelete = 0;
                string Query = "DELETE [Order] WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                idDelete = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, c);
                return idDelete;
            }
        }
        public async Task<Order> GetOrderById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM [Order] WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Order>(Query, param, null, null, c);
                return rs.FirstOrDefault();
            }
        }
    }
}
