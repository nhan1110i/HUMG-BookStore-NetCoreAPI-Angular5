using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore_Models
{
    public class DataConnection
    {
        static string _ConnectionString = @"Data Source=DESKTOP-AFGQQ55\NHAN111OI;Initial Catalog=BookStore;Integrated Security=True";
        public static string ConnectionString
        {
            get
            {
                return DataConnection._ConnectionString;
            }
            set
            {
                DataConnection._ConnectionString = value;
            }
        }
        public static SqlConnection Connection()
        {
            SqlConnection conn = new SqlConnection(ConnectionString);
            if (conn.State == System.Data.ConnectionState.Closed)
            {
                conn.Open();
            }
            return conn;
        }
    }
}
