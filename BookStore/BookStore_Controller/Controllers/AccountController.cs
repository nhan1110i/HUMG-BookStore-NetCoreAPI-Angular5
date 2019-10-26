using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        Account account = new Account();
        Customer customer = new Customer();
        // GET: api/Account
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Account
        [HttpPost]
        public async Task<JsonResult> CustomerLogin([FromBody] Account accountLogin)
        {
            var acc = await account.CustomerLogin(accountLogin);
            if(acc.CustomerId == 0)
            {
                return new JsonResult(new Notice(1, "wrong user name or password"));
            }
            else
            {
                Customer customerLogin = await customer.GetCustomerById(acc.CustomerId);
                return new JsonResult(customerLogin);
            }
        }

        // PUT: api/Account/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
