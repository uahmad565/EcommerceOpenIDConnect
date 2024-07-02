using IdentityServer4;
using IdentityServer4.Models;
using System.Security.Claims;

namespace IdentitySvr
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetAllApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(name:"basicEcommerceWebApi",displayName:"Ecommerce API"),
            };
        }

        public static IEnumerable<ApiScope> GetAllApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope(name:"basicEcommerceWebApi",displayName:"Ecommerce API"),
                //new ApiScope(name:"basicEcommerceWebApi",displayName:"Ecommerce API"),

            };
        }

        public static IEnumerable<Client> GetClients() =>
            new List<Client>
            {
                new() {
                    ClientId = "client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets =
                    {
                        new Secret(value:"secret".Sha256()),
                    },
                    AllowedScopes = {"basicEcommerceWebApi" },
                }
            };

    }
}
