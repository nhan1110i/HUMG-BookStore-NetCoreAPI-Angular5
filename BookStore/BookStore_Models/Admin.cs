using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Admin
    {
        public Admin()
        {
            this.Id = 0;
            this.Username = this.Password = this.Role = "";
        }
        public Admin(int Id, string Username, string Password, string Role)
        {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.Role = Role;
        }
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public async Task<bool> CheckLogin(Admin admin)
        {
            using (DataConnection.Connection())
            {
                
                string Query = "SELECT * FROM Admin WHERE Username = @Username";
                var param = new DynamicParameters();
                param.Add("@Username", admin.Username);
               // param.Add("@Password",admin.Password ); //hash.CreateHash(admin.Password)
                CommandType command = new CommandType();
                var rs = await DataConnection.Connection().QueryAsync<Admin>(Query, param, null, null, command);
                if(admin.Password == rs.Single().Password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }
        public async Task<int> CreateAdmin(Admin admin)
        {
            
            using (DataConnection.Connection())
            {
                var insertAdmin = 0;
                string Query = "INSERT INTO Admin VALUES (@Username, @Password) ; SELECT CAST(SCOPE_INDENTITY() as int)";
                var param = new DynamicParameters();
                param.Add("@Username", admin.Username);
                param.Add("@Password", admin.Password);
                CommandType command = CommandType.Text;
                insertAdmin = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return insertAdmin;
            }
        }

    }
}
