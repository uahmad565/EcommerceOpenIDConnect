using IdentityServer4;
using IdentityServer4.Models;
using System.Security.Claims;

namespace IdentitySvr
{
    public class Config
    {
        public static IEnumerable<ApiScope> GetAllApiResources()
        {
            return new List<ApiScope>
            {
                new ApiScope(name:"basicEcommerceWebApi",displayName:"Ecommerce API"),
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
