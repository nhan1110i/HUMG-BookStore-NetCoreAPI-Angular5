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
        public static string [] VnPath()
        {
            string[] rs = { "Thêm mới một danh mục", "Xóa một danh mục", "Cập nhật một danh mục", "Thêm mới một sản phẩm", "Xóa một sản phẩm", "Xóa nhiều sản phẩm", "Cập nhật một sản phẩm", "Xóa một nhân viên", "Tạo một nhân viên", "Kích hoạt một khách hàng", "Chặn một khách hàng", "Xóa một khách hàng", "Chấp nhận một đơn hàng", "Từ chối một đơn hàng", "Xóa một đơn hàng" };
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