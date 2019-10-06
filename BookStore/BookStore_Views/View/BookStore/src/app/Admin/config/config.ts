export var url = {
    host: "https://localhost:44315/",
    category : {
        categories : "Category/GetCategories",
        parentCategories : "ParentCategory/GetParentCategories",
        addCategory : "Category/AddCategory",
        deleteCategory: "Category/DeleteCategory",
        updateCategory : "Category/UpdateCategory"
    },
    admin : {
        login: "Admin/CheckLogin",
    },
    product:{
        products: "Product/GetProducts"
    },
    author: {
        authors: "Author/GetAuthors"
    },
    publishing: {
        publishings :"PublishingHouse/GetListPublishing"
    }
}
export var config = {
    salt: "tingting"
}
export var alert = {
    update: {
        style: "alert alert-info",
        title: "UPDATE",
        content: "Cập nhật thành công"
    },
    delete: {
        style: "alert alert-danger",
        title: "DELETE",
        content: "Xóa thành công"
    },
    add: {
        style: "alert alert-success",
        title: "ADD",
        content: "Thêm mới thành công"
    },
    wrongPassword: {
        style: "alert alert-danger",
        title: "WRONG",
        content: "Sai tên đăng nhập hoặc mật khẩu"
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
export function formatCurrency(money: number): string{
    var s = money.toString();
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, ".");
    return ret.toString()+" đ";
}
