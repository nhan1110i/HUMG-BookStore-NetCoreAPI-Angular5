export var url = {
    host: "https://localhost:44315/",
    category : {
        categories : "Category/GetCategories",
        parentCategories : "ParentCategory/GetParentCategories",
        addCategory : "Category/AddCategory",
        deleteCategory: "Category/DeleteCategory",
        updateCategory : "Category/UpdateCategory",
        categoriesActive: "Category/GetCategoriesActive"
    },
    admin : {
        login: "Admin/CheckLogin",
    },
    product:{
        products: "Product/GetProducts",
        insert : "Product/InsertProduct",
        delete : "Product/DeleteProductById",
        deleteProducts: "Product/DeleteProducts",
        getProductById: "Product/GetProductById/",
        updateProduct : "Product/UpdateProduct",
        productHome : "Product/GetNumberProductsByCategory",
        productByCategoryId: "Product/GetProductByCategoryId"
    },
    author: {
        authors: "Author/GetAuthors"
    },
    publishing: {
        publishings :"PublishingHouse/GetListPublishing"
    },
    employee: {
        employees : "Admin/GetAdmins",
        insert : "Admin/CreateAdmin",
        update: "Admin/UpdateAdmin",
        delete: "Admin/DeleteAdmin",
    },
    customer : {
        customers: "Customer/GetCustomers",
        delete: "Customer/DeleteCustomer",
        active : "Customer/ActiveCustomer"
    },
    order : {
        orders: "Order/GetOrders",
        complete: "Order/CompleteOrder",
        decline: "Order/DeclineOrder",
        delete: "Order/DeleteOrder",
    }
}
export var config = {
    salt: "tingting"
}
export var alert = {
    update: {
        style: "alert alert-info",
        title: "THÔNG BÁO",
        content: "Cập nhật thành công"
    },
    delete: {
        style: "alert alert-danger",
        title: "THÔNG BÁO",
        content: "Xóa thành công"
    },
    add: {
        style: "alert alert-success",
        title: "THÔNG BÁO",
        content: "Thêm mới thành công"
    },
    wrongPassword: {
        style: "alert alert-danger",
        title: "THÔNG BÁO",
        content: "Sai tên đăng nhập hoặc mật khẩu"
    },
    auth: {
        style : "alert alert-warning",
        title : "THÔNG BÁO",
        content : "Không đủ quyền để thực hiện"
    },
    error : {
        style : 'alert alert-danger',
        title: 'THÔNG BÁO',
        content: 'Lỗi không xác định'
    },
    expire: {
        style : 'alert alert-primary',
        title : 'THÔNG BÁO',
        content : "Hết phiên đăng nhập"
    }
}

export var badges ={
    product: (isActive : boolean) : string=>{
        if(isActive == true){
            return "Đang mở bán"
        }else{
            return "Đang đóng"
        }
    },
    category: (isActive : boolean) :string =>{
        if(isActive == true){
            return "đang mở"
        }else{
            return "Đang đóng"
        }
    }
}
// export function ResponException(rs : any, alert : any) : boolean{
//     if(rs.Error == 2){
//         window.location.href = "http://localhost:4200/login";
//         return false;
//     }else{
//         if(rs.Error == 3){
//             alert = this.alert.auth;
//         }
//     }
// }
export function formatCurrency(money: number): string{
    var s = money.toString();
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, ".");
    return ret.toString()+" đ";
}
export function GetUsername() : string {
    if(localStorage.getItem("Username")){
        return localStorage.getItem("Username");
    }else{
        return "NoName"
    }
}
export function GetAuthorization() : string{
    if(localStorage.getItem("Authorization")){
        return localStorage.getItem("Authorization");
    }else{
        return "noAuthorziation"
    }
}
export function CloseAlert(alert : any){
    alert = null;
}
