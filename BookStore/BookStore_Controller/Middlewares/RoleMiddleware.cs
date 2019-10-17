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
            if(Array.IndexOf(ControllerPath.Path(), context.Request.Path.ToString().Trim()) != -1)
            {
                string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                string[] arrRole = JsonWebToken.GetRole(tokenValue);
                string path = context.Request.Path.ToString().Trim();
                if (ControllerPath.Role(path, ControllerPath.Path(), arrRole))
                {
                    await _next(context);
                }
                else
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, "The account is not authorized")));
                }
            }
            else
            {
                await _next(context);
            }
            
        }
    }
}