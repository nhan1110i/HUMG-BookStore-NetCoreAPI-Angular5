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
        public async Task<int> CountOrder(DateTime Begin,DateTime End)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT COUNT(Id) FROM [Order] WHERE OrderAt BETWEEN @begin AND @end";
                var param = new DynamicParameters();
                param.Add("@begin", Begin);
                param.Add("@end", End);
                CommandType c = CommandType.Text;
                int rs = await DataConnection.Connection().ExecuteScalarAsync<int>(Query, param, null, null, c);
                return rs;
            }
        }
        public async Task<float> CountMoney(DateTime Begin, DateTime End)
        {
            string Query = "SELECT SUM(TotalMoney) FROM [Order] WHERE OrderAt BETWEEN @Begin AND @End";
            var param = new DynamicParameters();
            param.Add("@Begin", Begin);
            param.Add("@End", End);
            CommandType c = CommandType.Text;
            float rs = await DataConnection.Connection().ExecuteScalarAsync<float>(Query, param, null, null, c);
            return rs;
        }
        public async Task<int> InsertOrder(Order order)
        {
            using (DataConnection.Connection())
            {
                string Query = "INSERT INTO [Order] VALUES (@OrderCode,@TotalQuantity,@TotalMoney,@PaymentId,@StatusId,@CustomerId)";
                var param = new DynamicParameters();
                param.Add("@OrderCode", order.OrderCode);
                param.Add("@TotalQuantity", order.TotalQuantity);
                param.Add("@TotalMoney", order.TotalMoney);
                param.Add("@PaymentId", order.PaymentId);
                param.Add("@StatusId", order.StatusId);
                param.Add("@CustomerId", order.CustomerId);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, c);
                return rs;
            }
        }
    }
}
