using IdentitySvr;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddIdentityServer()
    .AddDeveloperSigningCredential()
    .AddInMemoryApiScopes(Config.GetAllApiResources())
    .AddInMemoryClients(Config.GetClients());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseIdentityServer();

app.MapGet("/", () => "Hello World!");

app.Run();
