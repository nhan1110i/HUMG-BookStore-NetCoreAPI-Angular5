using BookStore_Controller.Helper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public class SystemLog
    {
        private readonly RequestDelegate _next;
        public SystemLog(RequestDelegate Next)
        {
            this._next = Next;
        }
        public async Task Invoke(HttpContext context)
        {
            string path = context.Request.Path.ToString().Split("/")[2];
            int index = Array.IndexOf(ControllerPath.VnPath(), path);
            if(index != -1)
            {

            }
        }
    }
}
