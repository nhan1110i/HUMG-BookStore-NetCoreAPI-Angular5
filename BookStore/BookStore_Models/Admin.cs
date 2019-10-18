using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Admin
    {
        public Admin()
        {
            this.Id = 0;
            this.Username = this.Password = this.Role = this.Name = "";
        }
        public Admin(int Id, string Username, string Password, string Role, string Name)
        {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.Role = Role;
            this.Name = Name;
        }
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public async Task<Admin> Login(Admin admin)
        {
            using (DataConnection.Connection())
            {
                
                string Query = "SELECT * FROM Admin WHERE Username = @Username AND Password = @Password";
                var param = new DynamicParameters();
                param.Add("@Username", admin.Username);
                param.Add("@Password",admin.Password); 
                CommandType command = new CommandType();
                var rs = await DataConnection.Connection().QueryAsync<Admin>(Query, param, null, null, command);
                if(rs.Count() == 0)
                {
                    return new Admin();
                }
                else
                {
                    return rs.First();
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
        public async Task<List<Admin>> GetAdmins()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM Admin";
                CommandType comm = CommandType.Text;
                var admins = await DataConnection.Connection().QueryAsync<Admin>(Query, null, null, null, comm);
                return admins.ToList();
            }
        }
        public async Task<int> UpdateAdmin(Admin admin)
        {
            using (DataConnection.Connection())
            {
                var IdUpdate = 0;
                string Query = "UPDATE Admin SET Username = @Username, Password = @Password, Role = @Role, Name = @Name WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@UserName", admin.Username);
                param.Add("@Password", admin.Password);
                param.Add("@Role", admin.Role);
                param.Add("@Name", admin.Name);
                param.Add("@Id", admin.Id);
                CommandType command = CommandType.Text;
                IdUpdate = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return IdUpdate;

            }
        }
        public async Task<int> DeleteAdmin(int Id)
        {
            using (DataConnection.Connection())
            {
                var IdDelete = 0;
                string Query = "DELETE Admin WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType cm = CommandType.Text;
                IdDelete = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, cm);
                return IdDelete;
            }
        }

    }
}
