namespace EventBackend.Model
{
    public class EventoApprovato : Evento
    {


        public List<EventoPartecipante> Partecipanti { get; set; } = new List<EventoPartecipante>();
        public List<EventoOrganizzatore> Organizzatori { get; set; } = new List<EventoOrganizzatore>();
        public EventoApprovato()
        {
            Approvato = true;
        }



    }
}