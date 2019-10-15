using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore_Controller.Middlewares
{
    public static class MiddlewareExtenstions
    {
        public static IApplicationBuilder UseLoginMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoginMiddleware>();
        }
    }
}
