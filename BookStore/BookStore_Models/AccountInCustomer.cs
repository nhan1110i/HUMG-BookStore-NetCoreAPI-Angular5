using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class AccountInCustomer
    {
        public Customer Customer { get; set; }
        public Account Account { get; set; }
        public AccountInCustomer()
        {
            this.Customer = new Customer();
            this.Account = new Account();
        }
        public AccountInCustomer(Customer customer, Account account)
        {
            this.Customer = customer;
            this.Account = account;
        }
    }
}
