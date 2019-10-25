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
    public class CityController : ControllerBase
    {
        City city = new City();
        // GET: api/City
        [HttpGet]
        public async Task<JsonResult> GetCities()
        {
            var rs = await city.GetCities();
            return new JsonResult(rs);
        }

        // GET: api/City/5
       
    }
}
