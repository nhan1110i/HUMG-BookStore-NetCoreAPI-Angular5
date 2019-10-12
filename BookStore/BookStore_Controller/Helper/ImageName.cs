using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Controller.Helper
{
   
    public class ImageName
    {
        public static string CreateRadomString(int length)
        {
            
        StringBuilder rs = new StringBuilder();
            Random random = new Random();
            
            char ch;
            for (int i = 0; i < length; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                rs.Append(ch);
            }
            return rs.ToString();
        }
    }
}
