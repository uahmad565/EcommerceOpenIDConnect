using BasicEcommerceWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<InMemoryDbContext>(options => options.UseInMemoryDatabase("InMemoryDb"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Map("/environment", configuration =>
{
    configuration.Run(async context =>
    {
        await context.Response.WriteAsync("Currently running in Dev env mode: " + app.Environment.IsDevelopment().ToString());
    });
});

app.Map("/intro", configuration =>
{
    configuration.Run(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.WriteAsync(@"
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Web API</title>
        </head>
        <body>
            <h1>Welcome to My Web API</h1>
            <p>This is an HTML response from a .NET 8 Web API. Usman#2</p>
        </body>
        </html>");
    });
});

app.Run();
