using System;

namespace BookStore_Controller.Helper
{
    public class ControllerPath
    {
        public static string[] Path()
        {
            string[] rs = { "AddCategory", "DeleteCategory", "UpdateCategory","InsertProduct", "DeleteProductById", "DeleteProducts", "UpdateProduct","UpdateAdmin","DeleteAdmin","CreateAdmin","ActiveCustomer","DeleteCustomer","CompleteOrder","DeclineOrder","DeleteOrder"};
            return rs;
        }

        public static bool Role(string path, string[] action,string [] role)
        {
            if (Array.IndexOf(action, path) != -1)
            {
                if(Array.IndexOf(role,path) != -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }
    }
}