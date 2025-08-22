using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBackend.Model
{
    /// <summary>
    /// Concrete decorator that marks an event as shared between groups.
    /// The event is promoted by a single group but can invite other groups
    /// through the Invito entity.
    /// </summary>
    [Table("evento_condiviso")]
    public class EventoCondiviso : EventoDecorator
    {

        public List<Invito> Inviti { get; set; } = new();

        public EventoCondiviso(){}

        public EventoCondiviso(Evento evento) : base(evento){}
    }
}
