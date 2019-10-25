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
    public class StatisticalController : ControllerBase
    {
        // GET: api/Statistical
        Order order = new Order();
        Statistical statistical = new Statistical();
        [HttpGet]
        public async Task<JsonResult> GetStatistical()
        {
            Statistical rs = await statistical.GetStatistical();
            return new JsonResult(rs);
        }

        // GET: api/Statistical/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Statistical
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT: api/Statistical/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
