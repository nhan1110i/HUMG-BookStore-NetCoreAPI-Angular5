using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class PublishingHouse
    {
        public int Id { get; set; }
        public string PublishingName { get; set; }
        public string PublishingAddress { get; set; }
        public PublishingHouse()
        {
            this.Id = 0;
            this.PublishingName = "";
            this.PublishingAddress = "";
        }
        public async Task<PublishingHouse> GetPublishingHouseById(int Id)
        {
            using (DataConnection.Connection())
            {
                var Query = "SELECT * FROM PublishingHouse WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<PublishingHouse>(Query, param, null, null, command);
                return rs.Single();
            }
        }
        public async Task<List<PublishingHouse>> GetListPublishing()
        {
            using (DataConnection.Connection())
            {
                var query = "SELECT * FROM PublishingHouse";
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<PublishingHouse>(query, null, null, null, command);
                return rs.ToList();
            }
        }
    }
}
