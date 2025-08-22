using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    /// <summary>
    /// Abstract decorator for Evento. It stores a reference to the base evento
    /// and exposes the same properties so that concrete decorators can extend
    /// behaviour without modifying existing classes.
    /// </summary>
    public abstract class EventoDecorator : Evento
    {
        protected Evento? InnerEvento { get; set; }

        protected EventoDecorator()
        {
        }

        protected EventoDecorator(Evento evento)
        {
            InnerEvento = evento;
            Nome = evento.Nome;
            Descrizione = evento.Descrizione;
            DataInizio = evento.DataInizio;
            DataFine = evento.DataFine;
            nomeGruppo = evento.nomeGruppo;
            ImmagineProfilo = evento.ImmagineProfilo;
            Approvato = evento.Approvato;
        }
    }
}
