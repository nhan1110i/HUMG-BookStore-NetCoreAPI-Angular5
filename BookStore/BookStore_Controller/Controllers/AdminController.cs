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
        public async Task<JsonResult> GetAdmins()
        {
            var Admins = await admin.GetAdmins();
            return new JsonResult(Admins);
        }

        

        // POST: api/Admin
        [HttpPost]
        public async Task<JsonResult> CheckLogin([FromBody] Admin adminLogin)
        {
            adminLogin.Password = Cryptography.Create(adminLogin.Password);
            Admin LoginAdmin = await admin.Login(adminLogin);
            if(LoginAdmin.Role != "")
            {
                Token tokenResult = JsonWebToken.CreateNewToken(LoginAdmin);
                int insertId = await token.AddToken(tokenResult);
                if(insertId == 1)
                {
                    return new JsonResult(tokenResult);
                }
                else
                {
                    return new JsonResult(new Notice(1, "insert token fail"));
                }
                
            }
            else
            {
                return new JsonResult(new Notice(1, "Wrong username and password"));
            }
            
        }

        // PUT: api/Admin/5
        [HttpPut]
        public async Task<JsonResult> UpdateAdmin([FromBody] Admin AdminUpdate)
        {
            int rs = await admin.UpdateAdmin(AdminUpdate);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<JsonResult> DeleteAdmin(int id)
        {
            int rs = await admin.DeleteAdmin(id);
            if(rs == 0)
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
