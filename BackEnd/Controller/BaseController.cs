using Microsoft.AspNetCore.Mvc;
using ChatBackend.Data;

namespace ChatBackend.Controllers
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
