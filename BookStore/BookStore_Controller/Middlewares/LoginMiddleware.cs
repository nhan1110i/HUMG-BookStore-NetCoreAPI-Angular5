using BookStore_Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public class LoginMiddleware
    {
        private readonly RequestDelegate _next;
        Token token = new Token();
        public LoginMiddleware(RequestDelegate Next)
        {
            this._next = Next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (string.IsNullOrEmpty(context.Request.Headers["Authorization"]))
            {
                await context.Response.WriteAsync("not login");
            }
            else
            {
                string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                if(await token.CheckExpire(tokenValue))
                {
                    await this._next(context);
                }
                else
                {
                    await context.Response.WriteAsync("Expired Token");
                }

            }
        }
    }

    
}