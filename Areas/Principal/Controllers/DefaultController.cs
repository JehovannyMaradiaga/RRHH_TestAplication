using Microsoft.AspNetCore.Mvc;

namespace RRHH_TestAplication.Areas.Principal.Controllers
{
    public class DefaultController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
