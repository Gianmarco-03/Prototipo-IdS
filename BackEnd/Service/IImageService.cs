using Microsoft.AspNetCore.Http;
namespace Prototipo_IdS.Services
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(IFormFile file);
    }
}