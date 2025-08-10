namespace AdminBackend.Hubs
{
    public interface IAmministratoreService
    {
        Task<bool> ApprovaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin);
        Task<bool> BocciaEvento(string nomeEvento, string nomeGruppo, string usernameAdmin);
        Task<bool> Promuovi(string nomeGruppo, string username, string usernameAdmin);
        Task<bool> Rimuovi(string nomeGruppo, string username, string usernameAdmin);
    }
}