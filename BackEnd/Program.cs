using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ChatBackend.Hubs;  // Assumiamo che l'hub sia in questa namespace

var builder = WebApplication.CreateBuilder(args);

// Aggiungi servizi SignalR e CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
          .WithOrigins("http://localhost:3000")  // indirizzo frontend React
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();  // necessario per SignalR
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Server Chat Backend Online");

// Mappa l'hub SignalR sulla route /chatHub
app.MapHub<ChatHub>("/chatHub");

app.Run();
