using Microsoft.AspNetCore.SignalR;
using AuthBackend.Hubs;
using UtenteBackend.Controllers;
using AuthBackend.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;


namespace UtenteBackend.Hubs
{
    public class UtenteHub : Hub, IUtenteService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public UtenteHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IUtenteController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IUtenteController>();
        }

        public async Task<Utente?> GetInfo(string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(username);
        }

        public async Task<bool> UpdateInfo(Utente utente)
        {
            var ctrl = GetCtrl();
            return await ctrl.UpdateInfo(utente);
        }
        public async Task<string?> UploadImage(string username, string fileBase64)
        {
            var bytes = Convert.FromBase64String(fileBase64);
            await using var stream = new MemoryStream(bytes);
            IFormFile file = new FormFile(stream, 0, bytes.Length, "file", "upload.jpg");
            var ctrl = GetCtrl();
            return await ctrl.UploadImage(username, file);
        }
    }
}