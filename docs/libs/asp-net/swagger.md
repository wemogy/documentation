# Swagger

The Swagger Service Extensions make it easy to create API docs.

First, we want to make sure, that [XML documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/xmldoc/) will be used to describe the API, so first make sure, to add the following lines to the `.csproj` file.

```xml title=".csproj"
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

Now we can register Swagger in the `ConfigureServices` method of the `Startup.cs` file.

```csharp title="Startup.cs"
public void ConfigureServices(IServiceCollection services)
{
    // ...

    var xmlDocsFilePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
    services.AddSwagger("1.0", "My API", "1.0", "Lorem ipsum dolor.", xmlDocsFilePath);
}
```

**Optional:** If the API uses Authentication, we can add its description.

```csharp title="Startup.cs"
public void ConfigureServices(IServiceCollection services)
{
    // ...

    var xmlDocsFilePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
    services.AddSwagger("1.0", "My API", "1.0", "Lorem ipsum dolor.", xmlDocsFilePath, "Bearer", new OpenApiSecurityScheme
    {
        Description = "Lorem ipsum dolor.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
}
```

As a last step, make sure to include the `UseSwagger()` and `UseSwaggerUI()` methods in the `Configure` method of the `Startup.cs` file.

```csharp title="Startup.cs"
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.DocumentTitle = "My API";
        c.SwaggerEndpoint("/swagger/1.0/swagger.json", "Version 1.0");
        c.RoutePrefix = string.Empty;
    });
}
```
