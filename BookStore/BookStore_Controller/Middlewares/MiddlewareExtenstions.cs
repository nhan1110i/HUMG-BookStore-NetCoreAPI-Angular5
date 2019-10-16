using Microsoft.AspNetCore.Builder;

namespace BookStore_Controller.Middlewares
{
    public static class MiddlewareExtenstions
    {
        public static IApplicationBuilder UseLoginMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoginMiddleware>();
        }

        public static IApplicationBuilder UseRoleMiddleware(this IApplicationBuilder builder, string role)
        {
            return builder.UseMiddleware<RoleMiddleware>(role);
        }
    }
}