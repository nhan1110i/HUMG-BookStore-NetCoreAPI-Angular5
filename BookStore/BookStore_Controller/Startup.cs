using BookStore_Controller.Helper;
using BookStore_Controller.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.Swagger;
using System.IO;

namespace BookStore_Controller
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "BookStore API", Version = "v1.0" });
            });
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                 {
                     builder.WithOrigins("http://localhost:4200").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                 });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.Run(async (context) =>
            //{
            //    if (context.Request.Path == "/Category/GetCategories")
            //    {
            //        await context.Response.WriteAsync("heoo");
            //    }
            //});

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseStaticFiles(new StaticFileOptions { FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Assets", "Admin", "Products")), RequestPath = "/image" });
            app.UseCors("EnableCORS");
            app.UseSwagger();
            
            

            foreach (string url in ControllẻPath.CategoryController())
            {
                app.Map(url, mapApp =>
                {
                    mapApp.UseLoginMiddleware();
                    mapApp.UseRoleMiddleware("Category");
                });
            }
            

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookStore V1");
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}