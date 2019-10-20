using BookStore_Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private Customer customer = new Customer();
        private City city = new City();
        private Town town = new Town();

        // GET: api/Customer
        [HttpGet]
        public async Task<JsonResult> GetCustomers()
        {
            var customers = await customer.GetCustomers();
            List<CustomerInOrder> rs = new List<CustomerInOrder>();
            foreach (Customer cus in customers)
            {
                rs.Add(new CustomerInOrder(await city.GetCityById(cus.CityId), await town.GetTownById(cus.TownId), cus));
            }
            return new JsonResult(rs);
        }
        [HttpPut("{Id}")]
        public async Task<JsonResult> ActiveCustomer(int Id)
        {
            var rs = await customer.ActiveCustomer(Id);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "cant update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }

        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteCustomer(int Id)
        {
            var rs = await customer.DeleteCustomer(Id);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Deleted"));
            }
        }
    }
}