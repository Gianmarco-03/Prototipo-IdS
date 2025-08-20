using Microsoft.AspNetCore.SignalR;
using EventBackend.Hubs;
using EventBackend.Controllers;
using EventBackend.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace EventBackend.Hubs
{
    public class EventHub : Hub, IEventoService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public EventHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        private IEventController GetCtrl()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<IEventController>();
        }

        public async Task<Evento?> GetInfo(string nomeEvento, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            return await ctrl.GetInfo(nomeEvento, nomeGruppo);
        }

        public async Task<bool> CreaEvento(PropostaEvento evento, string username)
        {
            Console.WriteLine(evento.Nome);
            var ctrl = GetCtrl();
            return await ctrl.CreaEvento(evento, username);
        }

        public async Task Partecipa(string username, string nomeEvento, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            if (await ctrl.Partecipa(username, nomeEvento,nomeGruppo)){
                await Clients.All.SendAsync("PartecipantiAggiornati");
            }
        }

        public async Task Abbandona(string username, string nomeEvento, string nomeGruppo)
        {
            var ctrl = GetCtrl();
            if (await ctrl.Abbandona(username, nomeEvento,nomeGruppo)){
                await Clients.All.SendAsync("PartecipantiAggiornati");
                       }
        }

        public async Task<bool> UpdateInfo(Evento evento)
        {
            var ctrl = GetCtrl();
            return await ctrl.UpdateInfo(evento);
        }

        public async Task<string?> UploadImage(string nomeEvento, string nomeGruppo, string fileBase64)
        {
            var bytes = Convert.FromBase64String(fileBase64);
            await using var stream = new MemoryStream(bytes);
            IFormFile file = new FormFile(stream, 0, bytes.Length, "file", "upload.jpg");
            var ctrl = GetCtrl();
            return await ctrl.UploadImage(nomeEvento, nomeGruppo, file);
        }

        public async Task<bool> CheckOrganizzatore(string nomeEvento, string nomeGruppo, string username)
        {
            var ctrl = GetCtrl();
            return await ctrl.CheckOrganizzatore(nomeEvento, nomeGruppo, username);
        }
    }
}