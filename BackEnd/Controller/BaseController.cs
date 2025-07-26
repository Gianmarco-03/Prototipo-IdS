using Microsoft.AspNetCore.Mvc;
using Base.Data;

namespace Base.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected readonly AppDbContext _context;

        public BaseController(AppDbContext context)
        {
            _context = context;
        }
    }
}
