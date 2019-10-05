using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        Admin admin = new Admin();
        // GET: api/Admin
        [HttpGet]
        public JsonResult CheckLogin()
        {
            return new JsonResult(new Notice(0, "0"));
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
            var rs = await admin.CheckLogin(adminLogin);
            if (rs)
            {
                return new JsonResult(new Notice(0, "ok"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Wrong username or password"));
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
