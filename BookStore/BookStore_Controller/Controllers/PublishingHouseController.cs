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
    public class PublishingHouseController : ControllerBase
    {
        PublishingHouse ph = new PublishingHouse();
        // GET: api/PublishingHouse
        [HttpGet]
        public async Task<JsonResult> GetListPublishing()
        {
            return new JsonResult(await ph.GetListPublishing());
        }

        // GET: api/PublishingHouse/5
        
    }
}
