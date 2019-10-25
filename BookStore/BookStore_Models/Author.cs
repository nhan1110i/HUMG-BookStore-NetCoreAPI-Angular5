using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
namespace BookStore_Models
{
    public class Author
    {
        public Author(int Id, string AuthorName, string AuthorImage, string AuthorDescription)
        {
            this.Id = Id;
            this.AuthorName = AuthorName;
            this.AuthorImage = AuthorImage;
            this.AuthorDescription = AuthorDescription;
        }

        public Author()
        {
            this.Id = 0;
            this.AuthorName = "";
            this.AuthorImage = "";
            this.AuthorDescription = "";
        }

        public int Id { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public string AuthorDescription { get; set; }

        // function
        public async Task<List<Author>> GetListAuthor()
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM Author";
                CommandType command = CommandType.Text;
                var rs = await DataConnection.Connection().QueryAsync<Author>(Query, null, null,null, command);
                DataConnection.Connection().Close();
                return rs.ToList();
            }
        }
        public async Task<Author> GetAuthorById(int Id)
        {
            using (DataConnection.Connection())
            {
                string Query = "SELECT * FROM Author WHERE Id = @Id";
                CommandType command = CommandType.Text;
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                var rs = await DataConnection.Connection().QueryAsync<Author>(Query, param, null, null, command);
                if(rs.Count() != 0)
                {
                    return rs.FirstOrDefault();
                }
                else
                {
                    return new Author();
                }

            }

        }
        public async Task<int> InsertAuthor(Author author)
        {
            using (DataConnection.Connection())
            {
                var IdInsert = 0;
                string Query = "INSERT INTO Author VALUES (@AuthorName, @AuthorImage, @AuthorDescription); SELECT CAST(SCOPE_IDENTITY() as int)";
                var param = new DynamicParameters();
                param.Add("@AuthorName", author.AuthorName);
                param.Add("@AuthorImage", author.AuthorImage);
                param.Add("@AuthorDescription", author.AuthorDescription);
               // param.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
                CommandType command = CommandType.Text;
                IdInsert = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return IdInsert;
            }
        }
        public async Task<int> DeleteAuthor(int Id)
        {
            using (DataConnection.Connection())
            {
                var IdDelete = 0;
                string Query = "DELETE FROM Author WHERE Id = @Id"; 
                var param = new DynamicParameters();
                param.Add("@Id", Id);
                CommandType command = CommandType.Text;
                IdDelete = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return IdDelete;
            }
        }
        public async Task<int> UpdateAuthor(Author author, int Id)
        {
            using (DataConnection.Connection())
            {
                var IdUpdate = 0;
                string Query = "UPDATE Author SET AuthorName = @AuthorName,AuthorImage=@AuthorImage,AuthorDescription = @AuthorDescription WHERE Id = @Id";
                var param = new DynamicParameters();
                param.Add("@AuthorName", author.AuthorName);
                param.Add("@AuthorImage", author.AuthorImage);
                param.Add("@AuthorDescription", author.AuthorDescription);
                param.Add("@Id",Id);
                CommandType command = CommandType.Text;
                IdUpdate = await DataConnection.Connection().ExecuteAsync(Query, param, null, null, command);
                return IdUpdate;
            }
        }
    }
}
