using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class Mail
    {
        public string MailAdd { get; set; }
        public string Subject { get; set; }
        public string body { get; set; }
        public Mail(string MailAdd, string Subject, string body )
        {
            this.MailAdd = MailAdd;
            this.Subject = Subject;
            this.body = body;
        }
        
    }
}
