using BookStore_Controller.Helper;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public class RoleMiddleware
    {
        private readonly RequestDelegate _next;
        private Token token = new Token();

        public RoleMiddleware(RequestDelegate Next)
        {
            this._next = Next;
        }

        public async Task Invoke(HttpContext context)
        {
            string path = "/" + context.Request.Path.ToString().Split("/")[1] + "/" + context.Request.Path.ToString().Split("/")[2];
            if (Array.IndexOf(ControllerPath.Path(), path) != -1)
            {
                string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                string[] arrRole = JsonWebToken.GetRole(tokenValue);
                
                if (ControllerPath.Role(path, ControllerPath.Path(), arrRole))
                {
                    await _next(context);
                }
                else
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(3, "The account is not authorized")));
                }
            }
            else
            {
                await _next(context);
            }
            
        }
    }
}