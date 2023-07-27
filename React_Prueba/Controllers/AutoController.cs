using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_Prueba.Models;

namespace React_Prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoController : ControllerBase
    {
        private readonly ReactPruebaContext _dbcontext;

        public AutoController(ReactPruebaContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Listar()
        {
            List<Auto> lista = _dbcontext.Autos.OrderByDescending(A => A.IdAuto).ThenBy(A => A.FechaRegistro).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Auto request)
        {
            await _dbcontext.Autos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            Auto auto = _dbcontext.Autos.Find(id);

            _dbcontext.Autos.Remove(auto);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");

        }


    }
}
