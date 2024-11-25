using Microsoft.AspNetCore.Mvc;
using RRHH_TestAplication.Data;
using RRHH_TestAplication.Data.AplicationDbContext;
using System;
using System.Threading.Tasks;

namespace RRHH_TestAplication.Areas.Principal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestConectionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestConectionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("TestConnection")]
        public async Task<IActionResult> TestConnection()
        {
            try
            {
                // Intenta conectarte y verifica si la base de datos está accesible.
                var canConnect = await _context.Database.CanConnectAsync();
                if (canConnect)
                {
                    return Ok("Conexión exitosa a la base de datos.");
                }
                else
                {
                    return StatusCode(500, "No se pudo establecer la conexión a la base de datos.");
                }
            }
            catch (Exception ex)
            {
                // Devuelve el error en caso de que falle la conexión.
                return StatusCode(500, $"Error al conectar con la base de datos: {ex.Message}");
            }
        }
    }
}
