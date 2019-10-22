using BookStore_Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace BookStore_Controller.Helper
{
    public static class JsonWebToken
    {
        public static Token CreateNewToken(Admin admin)
        {
            string key = "IWantCodeAnymoreAndForever";
            SymmetricSecurityKey symmetricSecurity = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            SigningCredentials signCredentials = new SigningCredentials(symmetricSecurity, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                issuer: "BookStore",
                audience: "69",
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signCredentials,
                claims: new[]
                {
                    new Claim("AdminUsername",admin.Username),
                    //new Claim("AdminName",admin.Name),
                    new Claim("AdminRole", admin.Role)
                }
                ); ;
            return new Token(0, (new JwtSecurityTokenHandler().WriteToken(token)).ToString(), DateTime.Now, DateTime.Now, DateTime.Now.AddMinutes(30));
        }
        public static string[] GetRole(string Token)
        {
            JwtSecurityToken token = new JwtSecurityToken(jwtEncodedString: Token);
            string role = token.Claims.First(c => c.Type == "AdminRole").Value.ToString().Trim();
            string[] rs = role.Split('.');
            return rs;
        }
    }
}