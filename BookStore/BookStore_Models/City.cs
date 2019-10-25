using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class City
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public string ZipCode { get; set; }

        public City(int Id, string CityName, string ZipCode)
        {
            this.Id = Id;
            this.CityName = CityName;
            this.ZipCode = ZipCode;
        }
        public City()
        {
            this.Id = 0;
            this.CityName = this.ZipCode = "";
        }
        public async Task<City> GetCityById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * fROM City WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<City>(Query, param, null, null, c);
                return rs.FirstOrDefault();
            }
        }
        public async Task<List<City>> GetCities()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM City";
                CommandType c = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<City>(Query, null, null, null, c);
                return rs.ToList();
            }
        }
    }
    
}
