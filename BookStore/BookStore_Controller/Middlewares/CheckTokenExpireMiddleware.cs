using BookStore_Controller.Helper;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public class CheckTokenExpireMiddleware
    {
        private readonly RequestDelegate _next;
        private Token token = new Token();

        public CheckTokenExpireMiddleware(RequestDelegate Next)
        {
            this._next = Next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (Array.IndexOf(ControllerPath.Path(), context.Request.Path.ToString().Trim()) != -1)
            {
                if (string.IsNullOrEmpty(context.Request.Headers["Authorization"]))
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, context.Request.Path)));
                }
                else
                {
                    string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                    if (await token.CheckExpire(tokenValue))
                    {
                        await _next(context);
                    }
                    else
                    {
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, "Token Expire")));
                    }
                }
            }
            else
            {
                await _next(context);
            }
        }
    }
}