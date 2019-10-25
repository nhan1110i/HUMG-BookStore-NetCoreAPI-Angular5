using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Town
    {
        public int Id { get; set; }
        public string TownName { get; set; }
        public int CityId { get; set; }
        public Town()
        {
            this.Id = 0;
            this.TownName = "";
            this.CityId = 0;
        }

        public async Task<Town> GetTownById(int Id)
        {
            using (DataConnection.Connection())
            {
                string query = "SELECT * FROM Town WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Town>(query, param, null, null, c);
                return rs.FirstOrDefault();
            }
        }
        public async Task<List<Town>> GetTownsByCityId(int Id)
        {
            using (DataConnection.Connection())
            {
                string query = "SELECT * FROM Town WHERE CityId = @Id";
                var par = new DynamicParameters();
                par.Add("@Id", Id);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Town>(query, par, null, null, c);
                return rs.ToList();
            }
        }
    }
}
