using Microsoft.AspNetCore.Builder;

namespace BookStore_Controller.Middlewares
{
    public static class MiddlewareExtenstions
    {
        public static IApplicationBuilder UseCheckTokenExpireMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CheckTokenExpireMiddleware>();
        }

        public static IApplicationBuilder UseRoleMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RoleMiddleware>();
        }
    }
}