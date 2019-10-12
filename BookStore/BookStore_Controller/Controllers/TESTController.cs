using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace BookStore_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TESTController : ControllerBase
    {
        // GET: api/TEST
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/TEST/5
        [HttpGet("{id}", Name = "Get")]
        public String Get(int id)
        {
            return "1";
        }

        // POST: api/TEST
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TEST/5
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
