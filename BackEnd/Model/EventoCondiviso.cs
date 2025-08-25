using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    /// <summary>
    /// Rappresenta un evento approvato che è stato contrassegnato come
    /// condiviso tra più gruppi. Viene usato come DTO per restituire gli
    /// eventi condivisi al client.
    /// </summary>
    public class EventoCondiviso : EventoDecorator
    {
        public List<Invito> Inviti { get; set; } = new();

        public EventoCondiviso()
        {
            Approvato = true;
        }

        public EventoCondiviso(Evento evento)
        {
            Nome = evento.Nome;
            Descrizione = evento.Descrizione;
            DataInizio = evento.DataInizio;
            DataFine = evento.DataFine;
            nomeGruppo = evento.nomeGruppo;
            ImmagineProfilo = evento.ImmagineProfilo;
            Approvato = true;
        }
    }
}
