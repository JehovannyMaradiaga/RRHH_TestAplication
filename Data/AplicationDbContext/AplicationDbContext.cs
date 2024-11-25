using Microsoft.EntityFrameworkCore;

namespace RRHH_TestAplication.Data.AplicationDbContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Aquí puedes definir los DbSet si tuvieras modelos, por ejemplo:
        // public DbSet<Empleado> Empleados { get; set; }
    }
}
