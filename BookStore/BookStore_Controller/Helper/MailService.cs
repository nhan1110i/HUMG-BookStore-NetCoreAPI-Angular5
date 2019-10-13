using BookStore_Models;
using System;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace BookStore_Controller.Helper
{
    public static class MailService
    {
        private static string smtpUserName = "nhan.trong1200@gmail.com";
        private static string smtpPassword = "nhanhanhA1";
        private static string smtpHost = "smtp.gmail.com";
        private static int smtpPort = 25;

        public static void Send(Mail mail)
        {
            try
            {
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.Host = smtpHost;
                    smtpClient.Port = smtpPort;
                    smtpClient.UseDefaultCredentials = true;
                    smtpClient.Credentials = new NetworkCredential(smtpUserName, smtpPassword);
                    var msg = new MailMessage
                    {
                        IsBodyHtml = true,
                        BodyEncoding = Encoding.UTF8,
                        From = new MailAddress(smtpUserName),
                        Subject = mail.Subject,
                        Body = mail.body,
                        Priority = MailPriority.Normal,
                    };
                    msg.To.Add(mail.MailAdd);
                    smtpClient.Send(msg);
                    ;
                }
            }
            catch
            {
                Console.WriteLine("err");
            }
        }
    }
}