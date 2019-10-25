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
    public class TownController : ControllerBase
    {
        Town town = new Town();
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetTownByCityId(int Id)
        {
            var rs = await town.GetTownsByCityId(Id);
            return new JsonResult(rs);
        }
    }
}