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
    public class SystemLogMiddleware
    {
        private readonly RequestDelegate _next;
        public SystemLogMiddleware(RequestDelegate Next)
        {
            this._next = Next;
        }
        public async Task Invoke(HttpContext context)
        {
            string path = context.Request.Path.ToString().Split("/")[2];
            int index = Array.IndexOf(ControllerPath.VnPath(), path);
            if(index != -1)
            {
                string tokenValue = context.Request.Headers["Authorization"].ToString().Trim();
                string UserName = JsonWebToken.GetUser(tokenValue);
                string Action = ControllerPath.VnPath()[index];
                Log insert = new Log();
                Log log = new Log(0, UserName, Action, DateTime.Now);
                var rs = await insert.InsertLog(log);
                if(rs == 0)
                {
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new Notice(1, "Cant Insert")));
                }
                else
                {
                    await _next(context);
                }
            }
            else
            {
                await _next(context);
            }
        }
    }
}
