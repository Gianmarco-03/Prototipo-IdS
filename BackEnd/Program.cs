using CloudinaryDotNet;
using Prototipo_IdS.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization; // 🔹 per ReferenceHandler    
using ChatBackend.Hubs;
using ChatBackend.Controllers;
using Base.Data;
using AuthBackend.Controllers;
using Microsoft.AspNetCore.Identity;
using AuthBackend.Hubs;
using AuthBackend.Model;
using GroupBackend.Controllers;
using EventBackend.Controllers;
using GroupBackend.Hubs;
using EventBackend.Hubs;
using UtenteBackend.Hubs;
using UtenteBackend.Controllers;
using HomeBackend.Controllers;
using HomeBackend.Hubs;
using EventBackend.Model;
using AdminBackend.Controllers;
using AdminBackend.Hubs;
using SearchBackend.Controllers;
using SearchBackend.Hubs;

var builder = WebApplication.CreateBuilder(args);
var cloudAccount = new Account(builder.Configuration["Cloudinary:CloudName"],
    builder.Configuration["Cloudinary:ApiKey"],
    builder.Configuration["Cloudinary:ApiSecret"]);
var cloudinary = new Cloudinary(cloudAccount);
builder.Services.AddSingleton(cloudinary);
builder.Services.AddScoped<IImageService, CloudinaryImageService>();

// Mappa l'enum degli eventi a livello globale per Npgsql

// Aggiungi servizi CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // Frontend React
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Aggiungi il DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// Aggiungi SignalR con supporto per cicli oggetto e messaggi grandi
builder.Services.AddSignalR(options =>
{
    // Consenti fino a 10 MB per messaggi (utile per immagini base64)
    options.MaximumReceiveMessageSize = 10 * 1024 * 1024;
})
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.PayloadSerializerOptions.WriteIndented = false;
    });


// Aggiungi controller MVC (per REST API)
builder.Services.AddControllers();
builder.Services.AddScoped<IChatController, ChatController>();
builder.Services.AddScoped<IAuthController, AuthController>();
builder.Services.AddScoped<IGruppoController, GruppoController>();
builder.Services.AddScoped<IEventController, EventController>();
builder.Services.AddScoped<IEventoCondivisoController, EventoCondivisoController>();
builder.Services.AddScoped<IUtenteController, UtenteController>();
builder.Services.AddScoped<IHomeController, HomeController>();
builder.Services.AddScoped<IPasswordHasher<Utente>, PasswordHasher<Utente>>();
builder.Services.AddScoped<IAmministratoreController, AmministratoreController>();
builder.Services.AddScoped<ISearchController, SearchController>();  

var app = builder.Build();

// Abilita CORS
app.UseCors();

// Abilita routing e authorization
app.UseRouting();
app.UseAuthorization();
app.UseStaticFiles();

// Mappa i controller
// Mappa l'hub SignalR
app.MapHub<ChatHub>("/chatHub");
app.MapHub<AuthHub>("/authHub");
app.MapHub<GruppoHub>("/gruppoHub");
app.MapHub<EventoCondivisoHub>("/eventoCondivisoHub");
app.MapHub<EventHub>("/eventoHub");
app.MapHub<UtenteHub>("/utenteHub");
app.MapHub<HomeHub>("/homeHub");
app.MapHub<AmministratoreHub>("/amministratoreHub");
app.MapHub<SearchHub>("/searchHub");

// Test GET base
app.MapGet("/", () => "Server Chat Backend Online");

app.Run();
