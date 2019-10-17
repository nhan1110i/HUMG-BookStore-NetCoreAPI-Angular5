using System;

namespace BookStore_Controller.Helper
{
    public class ControllerPath
    {
        public static string[] Path()
        {
            string[] rs = { "/Category/AddCategory", "/Category/DeleteCategory", "/Category/UpdateCategory","/Product/InsertProduct", "/Product/DeleteProductById", "/Product/DeleteProducts", "/Product/UpdateProduct" };
            return rs;
        }

        public static bool Role(string path, string[] action,string [] role)
        {
            if (Array.IndexOf(action, path) != -1)
            {
                if(Array.IndexOf(role,path.Split("/")[1]) != -1)
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