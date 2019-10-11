using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerMail { get; set; }
        public int CityId { get; set; }
        public int TownId { get; set; }
        public string CustomerAddress { get; set; }
        public int TotalOrder { get; set; }
        public int TotalOrderComplete { get; set; }
        public int TotalOrderCancel { get; set; }
        public bool IsActive { get; set; }
        public async Task<int> InsertCustomer(Customer customer)
        {

            using (DataConnection.Connection())
            {
                var rs = 0;
                string Query = "INSERT INTO Customer VALUES (@CustomerName,@CustomerPhone,@CustomerMail,@CityId,@TownId,@CustomerAddress,@TotalOrder,@TotalOrderComplete,@TotalOrderCancel,@IsActive)";
                var param = new DynamicParameters();
                param.Add("@CustomerName", customer.CustomerName);
                param.Add("@CustomerPhone", customer.CustomerPhone);
                param.Add("@customerMail", customer.CustomerMail);
                param.Add("@CityId", customer.CityId);
                param.Add("@TownId", customer.TownId);
                param.Add("@CustomerAddress", customer.CustomerAddress);
                param.Add("@TotalOrder", customer.TotalOrder);
                param.Add("@TotalOrderComplete", customer.TotalOrderComplete);
                param.Add("@TotalOrderCancel", customer.TotalOrderCancel);
                param.Add("@IsActive", customer.IsActive);
                CommandType comm = CommandType.Text;
                rs = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, comm);
                return rs;
            }
        }
        public async Task<Customer> GetCustomerById(int Id)
        {
            using (DataConnection.Connection()) {
                string Query = "SELECT * FROM customer WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType comm =  CommandType.Text;
                var rs =  await DataConnection.Connection().QueryAsync<Customer>(Query, param, null, null, comm);
                return rs.FirstOrDefault();
            }
        }
        public async Task<int> ActiveCustomer(int Id)
        {
            using (DataConnection.Connection())
            {
                var rs = 0;
                string Query = "UPDATE Customer SET (IsActive = @Active) WHERE Id = @Id";
                var param = new DynamicParameters();
                if((await GetCustomerById(Id)).IsActive)
                {
                    param.Add("@Active", false);
                }
                else
                {
                    param.Add("@Active", true);
                }
                param.Add("@Id", Id);
                CommandType comm = CommandType.Text;
                rs = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, comm);
                return rs;
            }
        }

    }
    
}
