using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
   public class Statistical
    {
        public List<DateTime> Date { get; set; }
        public List<int> TotalOrders { get; set; }
        public List<float> TolalMoney { get; set; }
        public Statistical()
        {

        }
        public Statistical( List<DateTime> date, List<int> orders, List<float> money)
        {
            this.Date = date;
            this.TotalOrders = orders;
            this.TolalMoney = money;
        }
        public async Task<Statistical> GetStatistical()
        {
            using (DataConnection.Connection())
            {
                List<DateTime> date = new List<DateTime>();
                List<int> orders = new List<int>();
                List<float> money = new List<float>();
                Order order = new Order();
                DateTime today = DateTime.Today;
                for (int i = 7; i > -1; i--)
                {
                    DateTime start = today.AddDays(-i);
                    DateTime end = start.AddHours(23).AddMinutes(59).AddSeconds(59);
                    date.Add(start);
                    orders.Add(await order.CountOrder(start, end));
                    money.Add(await order.CountMoney(start, end));
                }
                return new Statistical(date, orders, money);
            }
        }
    }
}
