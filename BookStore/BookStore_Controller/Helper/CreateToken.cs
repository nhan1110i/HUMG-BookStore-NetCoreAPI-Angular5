using BookStore_Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BookStore_Controller.Helper
{
    public static class CreateToken
    {
        public static Token CreateNewToken(Admin admin)
        {
            string key = "bibibobotinnhancuaaiemdanguchua";
            SymmetricSecurityKey symmetricSecurity = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            SigningCredentials signCredentials = new SigningCredentials(symmetricSecurity, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                issuer: admin.Username,
                audience: admin.Role,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signCredentials
                );
            return new Token(0, (new JwtSecurityTokenHandler().WriteToken(token)).ToString(), DateTime.Now, DateTime.Now, DateTime.Now.AddMinutes(10));            
        }
    }
}