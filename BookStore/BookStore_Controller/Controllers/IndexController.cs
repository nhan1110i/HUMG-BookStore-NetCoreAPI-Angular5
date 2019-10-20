using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        // GET: api/Index
        [HttpGet]
        public string index()
        {
            return "Server is running";
        }

        // GET: api/Index/5
        
    }
}
