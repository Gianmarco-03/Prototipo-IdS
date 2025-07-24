using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ChatBackend.Hubs;
using ChatBackend.Controllers;
using ChatBackend.Data; // Namespace del tuo DbContext

var builder = WebApplication.CreateBuilder(args);

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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Aggiungi controller MVC (per REST API)
builder.Services.AddControllers();
builder.Services.AddScoped<IChatController, ChatController>();
// Aggiungi SignalR
builder.Services.AddSignalR();

var app = builder.Build();

// Abilita CORS
app.UseCors();

// Abilita routing e authorization
app.UseRouting();
app.UseAuthorization();

// Mappa i controller

// Mappa l'hub SignalR
app.MapHub<ChatHub>("/chatHub");

// Test GET base
app.MapGet("/", () => "Server Chat Backend Online");

app.Run();
