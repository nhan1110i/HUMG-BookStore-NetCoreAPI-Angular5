namespace BookStore_Controller.Helper
{
    public class ControllẻPath
    {
        public static string[] CategoryController()
        {
            string[] rs = { "/Category/AddCategory", "/Category/DeleteCategory", "/Category/UpdateCategory" };
            return rs;
        }

        public static string[] ProductController()
        {
            string[] rs = { "/Product/InsertProduct", "/Product/DeleteProductById", "/Product/DeleteProducts", "/Product/UpdateProduct" };
            return rs;
        }
    }
}