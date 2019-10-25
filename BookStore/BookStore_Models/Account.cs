using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int CustomerId { get; set; }
        public Account()
        {
            this.Id = this.CustomerId = 0;
            this.Username = this.Password = "";
        }
        public Account(int Id, string Username, string Password, int CustomerId)
        {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.CustomerId = CustomerId;
        }
        public async Task<int> InsertAccount(Account account)
        {
            using (DataConnection.Connection())
            {
                var Query = "INSERT INTO Account VALUES (@Username,@Password,@CustomerId)";
                var param = new DynamicParameters();
                param.Add("@Username", account.Username);
                param.Add("@Password", account.Password);
                param.Add("@CustomerId", account.CustomerId);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, c);
                return rs;
            }
        }
        public async Task<Account> CustomerLogin(Account account)
        {
            using (DataConnection.Connection())
            {
                var Query = "SELECT * FROM Account WHERE Username = @Username AND Password = @Password";
                var param = new DynamicParameters();
                param.Add("@Username", account.Username);
                param.Add("@Password", account.Password);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Account>(Query, param, null, null, c);
                if(rs.Count() == 0)
                {
                    return new Account();
                }
                else
                {
                    return rs.FirstOrDefault();
                }
            }
        }
    }
}
