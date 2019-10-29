using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Log
    {
        public int Id { get; set; }
        public string UserLog { get; set; }
        public string Action { get; set; }
        public DateTime CreateAt { get; set; }
        public Log()
        {
            this.Id = 0;
            this.UserLog = this.Action = "";
            this.CreateAt = DateTime.Now;
        }
        public Log(int Id, string UserLog, string Action, DateTime CreateAt)
        {
            this.Id = Id;
            this.UserLog = UserLog;
            this.Action = Action;
            this.CreateAt = CreateAt;
        }
        public async Task<int> InsertLog(Log log)
        {
            using (DataConnection.Connection())
            {
                var insertId = 0;
                string Query = "INSERT INTO [Log] VALUES (@UserLog,@Action,@CreateAt";
                var param = new DynamicParameters();
                param.Add("@UserLog", log.UserLog);
                param.Add("@Action", log.Action);
                param.Add("@CreateAt", log.CreateAt);
                CommandType c = CommandType.Text;
                insertId = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, c);
                return insertId;
            }
        }
        public async Task<List<Log>> GetLogs()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM [Log]";
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Log>(Query, null, null, null, c);
                return rs.ToList();
            }
        }
    }
}
