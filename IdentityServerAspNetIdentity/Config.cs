// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


//https://code-maze.com/oauth2-refresh-token-angular-identityserver4/

using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServerAspNetIdentity
{
    public static class Config
    {

        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                        new IdentityResources.OpenId(),
                        new IdentityResources.Profile(),
                   };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope(name: "read",   displayName: "Read your data."),
                new ApiScope(name: "write",  displayName: "Write your data.", userClaims:new[]{"family_name"}),
                new ApiScope(name: "delete", displayName: "Delete your data."),
                new ApiScope("scope1"),
                new ApiScope("scope2"),
                new ApiScope(name:"basicEcommerceWebApi",displayName:"Ecommerce API", userClaims:new[]{"family_name", "name", "website"}),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "m2m.client",
                    ClientName = "Client Credentials Client",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                    AllowedScopes = { "scope1" }
                },

                // interactive ASP.NET Core MVC client
                new Client
                {
                    ClientId = "mvc",
                    ClientSecrets = { new Secret("secret".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,

                    // where to redirect to after login
                    RedirectUris = { "https://localhost:7127/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "https://localhost:7127/signout-callback-oidc" },

                    AllowOfflineAccess = true,
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "basicEcommerceWebApi"
                    }
                },

                //WebApi Client
                new Client
                {
                    ClientId="ecommerce_webapi_user",
                    AllowedGrantTypes= GrantTypes.ResourceOwnerPassword,
                    ClientSecrets = {new Secret("secret".Sha256())},
                    AllowedScopes = { "openid" ,"scope1", "profile", "write" },
                    AccessTokenLifetime = 3600,
                },

                //Angular Client
                new Client
                {
                    ClientName = "Angular-Client",
                    ClientId = "angular-client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = new List<string>{ "http://localhost:4200/signin-callback", "http://localhost:4200/assets/silent-callback.html" },
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = true,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "basicEcommerceWebApi"
                    },
                    AllowedCorsOrigins = { "http://localhost:4200" },
                    RequireClientSecret = false,
                    PostLogoutRedirectUris = new List<string> { "http://localhost:4200/signout-callback" },
                    RequireConsent = false,
                    AccessTokenLifetime = 120
                }
            };
    }
}