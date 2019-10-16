using BookStore_Controller.Helper;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public class RoleMiddleware
    {
        private readonly RequestDelegate _next;
        Token token = new Token();
        public RoleMiddleware(RequestDelegate Next)
        {
            this._next = Next;
        }

        public async Task Invoke(HttpContext context, string role)
        {
            if (string.IsNullOrEmpty(context.Request.Headers["Authorization"]))
            {
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, "not login")));
            }
            else
            {
                string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                string[] arrRole = JsonWebToken.GetRole(tokenValue);
                if(Array.IndexOf(arrRole,role) == -1)
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, "not Authorization")));
                }
                else
                {
                    await this._next(context);
                }

            }
        }
    }
}
