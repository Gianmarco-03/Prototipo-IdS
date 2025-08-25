using Microsoft.AspNetCore.SignalR;
using GroupBackend.Hubs;
using GroupBackend.Controllers;
using GroupBackend.Model;
using EventBackend.Model;

namespace GroupBackend.Hubs
{
    public class GruppoHub : Hub, IGruppoService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public GruppoHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IGruppoController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IGruppoController>();
        }

        public async Task<Gruppo?> GetInfo(string nomeGruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(nomeGruppo);
        }

        public async Task<bool> CheckAdmin(string gruppo, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.CheckAdmin(gruppo, username);
        }

        public async Task<bool> CreaGruppo(Gruppo gruppo, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.CreaGruppo(gruppo, username);
        }

        public async Task Partecipa(string username, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            await ctrl.Partecipa(username, nomeGruppo);
        }

        public async Task Abbandona(string username, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            await ctrl.Abbandona(username, nomeGruppo);
        }

        public async Task<List<Evento>?> getEventiGruppo(string nomeGruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetEventiGruppo(nomeGruppo);
        }

        public async Task<List<EventoApprovato>> FindEventiGruppo(string nomeGruppo, string toSearch)
        {
            var ctrl = GetCtrl();
            return await ctrl.FindEventiGruppo(nomeGruppo, toSearch);
        }

        public async Task<bool> UpdateInfo(Gruppo gruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.UpdateInfo(gruppo);
        }

        public async Task<string?> UploadImage(string nomeGruppo, string fileBase64)
        {
            var bytes = Convert.FromBase64String(fileBase64);
            await using var stream = new MemoryStream(bytes);
            IFormFile file = new FormFile(stream, 0, bytes.Length, "file", "upload.jpg");
            var ctrl = GetCtrl();
            return await ctrl.UploadImage(nomeGruppo, file);
        }

        public async Task<List<Invito>> GetInvitiPerGruppo(string gruppoInvitato)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInvitiPerGruppo(gruppoInvitato);
        }
        
    }
}
