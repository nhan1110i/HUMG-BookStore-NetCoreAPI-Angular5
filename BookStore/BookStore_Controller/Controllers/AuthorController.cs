using BookStore_Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookStore_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private Author author = new Author();

        [HttpGet]
        public async Task<JsonResult> GetListAuthor()
        {
            // var rs = await author.GetListAuthor();
            return new JsonResult(await author.GetListAuthor());
        }

        [HttpGet("{Id}")]
        public async Task<JsonResult> GetAuthorById(int Id)
        {
            var rs = await author.GetAuthorById(Id);
            if (rs == null)
            {
                return new JsonResult(new Notice(1, "Not found"));
            }
            else
            {
                return new JsonResult(rs);
            }
        }

        [HttpPost]
        public async Task<JsonResult> InsertAuthor([FromBody] Author author)
        {
            int rs = await author.InsertAuthor(author);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Not complete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Success"));
            }
        }

        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteAuthorById(int Id)
        {
            int rs = await author.DeleteAuthor(Id);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Complete"));
            }
        }

        [HttpPut("{Id}")]
        public async Task<JsonResult> UpdateAuthor(Author author, int Id)
        {
            int rs = await author.UpdateAuthor(author, Id);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }
    }
}