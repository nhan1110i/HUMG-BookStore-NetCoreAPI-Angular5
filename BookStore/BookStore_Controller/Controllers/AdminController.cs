using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore_Controller.Helper;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        Admin admin = new Admin();
        Token token = new Token();
        // GET: api/Admin
        [HttpGet]
        public bool Login([FromBody] Admin adminLogin, string salt)
        {
            return true;
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<JsonResult> CheckLogin([FromBody] Admin adminLogin)
        {
            adminLogin.Password = Cryptography.Create(adminLogin.Password);
            if(await admin.Login(adminLogin))
            {
                Token tokenResult = JsonWebToken.CreateNewToken(adminLogin);
                await token.AddToken(tokenResult);
                return new JsonResult(tokenResult);
            }
            else
            {
                return new JsonResult(new Notice(1, "Wrong username and password"));
            }
            
        }

        // PUT: api/Admin/5
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
