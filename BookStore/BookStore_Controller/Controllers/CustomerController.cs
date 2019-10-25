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
        private Account account = new Account();

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
        [HttpPost]
        public async Task<JsonResult> InsertAccountInCustomer([FromBody] AccountInCustomer accountInCustomer)
        {
            var rs = await customer.InsertCustomer(accountInCustomer.Customer);
            if(rs != 0)
            {
                int id = await customer.GetLastCustomer();
                accountInCustomer.Account.CustomerId = id;
                var insertAccount = await account.InsertAccount(accountInCustomer.Account);
                if(insertAccount != 0)
                {
                    return new JsonResult(new Notice(0, "inserted"));
                }
                else
                {
                    return new JsonResult(new Notice(1, "loi"));
                }
            }
            else
            {
                return new JsonResult(new Notice(1, "loi"));
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
        [HttpPost]
        public async Task<JsonResult> InsertCustomer([FromBody] Customer customerInsert)
        {
            var rs = await customer.InsertCustomer(customerInsert);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "cant insert"));
            }
            else
            {
                return new JsonResult(new Notice(0, "inserted"));
            }
        }
        
    }
}