using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore; // Importante para DbContext
using RRHH_TestAplication.Data.AplicationDbContext; // Espacio de nombres de ApplicationDbContext

namespace RRHH_TestAplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }



        // Método para registrar servicios en el contenedor.
        public void ConfigureServices(IServiceCollection services)
        {

            // Registro del DbContext con la cadena de conexión definida en appsettings.json
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("RRHH_TestAplication_CadenaConexion")));

            // Registrar IHttpContextAccessor
            services.AddHttpContextAccessor();

            // Registro de controladores con vistas
            services.AddControllersWithViews();

        }

        // Método para configurar el pipeline HTTP.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // Configuración de HSTS (30 días por defecto)
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{area=Principal}/{controller=Default}/{action=Index}/{id?}");
            });
        }
    }
}
