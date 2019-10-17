using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Token
    {
        public int Id { get; set; }
        public string TokenValue { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime ExpireAt { get; set; }

        public Token(int Id, string TokenValue, DateTime CreateAt, DateTime UpdateAt, DateTime ExpireAt)
        {
            this.Id = Id;
            this.TokenValue = TokenValue;
            this.CreateAt = CreateAt;
            this.UpdateAt = UpdateAt;
            this.ExpireAt = ExpireAt;
        }
        public Token()
        {
            this.Id = 0;
            this.TokenValue = "";
            this.CreateAt = this.UpdateAt = this.ExpireAt = DateTime.Now;
        }
        public async Task<int> AddToken(Token token)
        {
            using (DataConnection.Connection())
            {
                var insertId = 0;
                string Query = "INSERT INTO Token VALUES (@TokenValue,@CreateAt,@UpdateAt,@ExpireAt)";
                var param = new DynamicParameters();
                param.Add("@TokenValue", token.TokenValue);
                param.Add("@CreateAt", token.CreateAt);
                param.Add("@UpdateAt", token.UpdateAt);
                param.Add("@ExpireAt", token.ExpireAt);
                CommandType command = CommandType.Text;
                insertId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return insertId;
            }
        }
        public async Task<bool> CheckExpire(string TokenValue)
        {
            string Query = "SELECT ExpireAt FROM Token WHERE TokenValue = @TokenValue";
            var param = new DynamicParameters();
            param.Add("@TokenValue", TokenValue);
            CommandType comm = CommandType.Text;
            var rs = await DataConnection.Connection().QueryAsync<DateTime>(Query, param, null, null, comm);
            if(rs.Count() == 0)
            {
                return false;
            }
            else
            {
                if(rs.FirstOrDefault() > DateTime.Now)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }

}
