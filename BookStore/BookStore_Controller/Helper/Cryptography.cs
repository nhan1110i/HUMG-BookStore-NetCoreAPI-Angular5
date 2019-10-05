using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Controller.Helper
{
    public class Cryptography
    {
        static string salt = "tingting";
        public string CreateHash(string password)
        { 
            var Hashed = KeyDerivation.Pbkdf2(
                    password: password,
                    salt: Encoding.UTF8.GetBytes(salt),
                    prf: KeyDerivationPrf.HMACSHA512,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                    );
            return Convert.ToBase64String(Hashed);
        }
    }
}
