import { ProductService } from '../services/product/product.service'
import Swal from 'sweetalert2'
export var url = {
    host: "https://localhost:44315/",
    category: {
        categories: "Category/GetCategories",
        parentCategories: "ParentCategory/GetParentCategories",
        addCategory: "Category/AddCategory",
        deleteCategory: "Category/DeleteCategory",
        updateCategory: "Category/UpdateCategory",
        categoriesActive: "Category/GetCategoriesActive"
    },
    admin: {
        login: "Admin/CheckLogin",
    },
    product: {
        products: "Product/GetProducts",
        insert: "Product/InsertProduct",
        delete: "Product/DeleteProductById",
        deleteProducts: "Product/DeleteProducts",
        getProductById: "Product/GetProductById/",
        updateProduct: "Product/UpdateProduct",
        productHome: "Product/GetNumberProductsByCategory",
        productByCategoryId: "Product/GetProductByCategoryId"
    },
    statistical: {
        statistical: "Statistical/GetStatistical"
    },
    author: {
        authors: "Author/GetAuthors"
    },
    publishing: {
        publishings: "PublishingHouse/GetListPublishing"
    },
    employee: {
        employees: "Admin/GetAdmins",
        insert: "Admin/CreateAdmin",
        update: "Admin/UpdateAdmin",
        delete: "Admin/DeleteAdmin",
    },
    customer: {
        customers: "Customer/GetCustomers",
        delete: "Customer/DeleteCustomer",
        active: "Customer/ActiveCustomer",
        insert: "Customer/InsertAccountInCustomer",
        login: "Account/CustomerLogin"
    },
    order: {
        orders: "Order/GetOrders",
        complete: "Order/CompleteOrder",
        decline: "Order/DeclineOrder",
        delete: "Order/DeleteOrder",
        orderDetail: "Order/GetOrderById",
        checkOutSameAddress: "Order/CheckOutSameAddress",
        checkOutDifferentAddress: "Order/CheckOutDifferentAddress"
    },
    city: {
        cities: "City/GetCities"
    },
    town: {
        townsByCityId: "Town/GetTownByCityId"
    }
}
export var config = {
    salt: "tingting"
}
export function alert2(title: string, text: string, type: string) {
    switch (type) {
        case 'error':
            Swal.fire({
                title: title,
                text: text,
                type: 'error',
            })
            break;
        case 'success':
            Swal.fire({
                title: title,
                text: text,
                type: 'success',
            })
            break;
        case 'warning':
            Swal.fire({
                title: title,
                text: text,
                type: 'warning',
            })
            break;
        case 'info':
            Swal.fire({
                title: title,
                text: text,
                type: 'info',
            })
            break;
    }
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
        style: "alert alert-warning",
        title: "THÔNG BÁO",
        content: "Không đủ quyền để thực hiện"
    },
    error: {
        style: 'alert alert-danger',
        title: 'THÔNG BÁO',
        content: 'Lỗi không xác định'
    },
    expire: {
        style: 'alert alert-primary',
        title: 'THÔNG BÁO',
        content: "Hết phiên đăng nhập"
    }
}

export var badges = {
    product: (isActive: boolean): string => {
        if (isActive == true) {
            return "Đang mở bán"
        } else {
            return "Đang đóng"
        }
    },
    category: (isActive: boolean): string => {
        if (isActive == true) {
            return "đang mở"
        } else {
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
export function formatCurrency(money: number): string {
    var s = money.toString();
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, ".");
    return ret.toString() + " đ";
}
export function GetUsername(): string {
    if (localStorage.getItem("Username")) {
        return localStorage.getItem("Username");
    } else {
        return "NoName"
    }
}
export function GetAuthorization(): string {
    if (localStorage.getItem("Authorization")) {
        return localStorage.getItem("Authorization");
    } else {
        return "noAuthorziation"
    }
}
export function CloseAlert(alert: any) {
    alert = null;
}
export function GetCustomer(): any {

    if (localStorage.getItem("customer")) {
        return JSON.parse(localStorage.getItem("customer"));
    } else {
        return "not login";
    }
}
export function GetPage(): any {
    if (localStorage.getItem("page")) {
        return localStorage.getItem("page").toString().trim()
    } else {
        return "B O O K S T O R E H O M E"
    }
}
export function AddProductCart(Id: number, quantity: number, price: number, name: string, image: string) {
    let product = {
        Id: Id,
        quantity: quantity,
        price: price,
        name: name,
        image: image
    }
    if (localStorage.getItem("cart")) {
        let orderDetail = JSON.parse(localStorage.getItem("cart"));
        let index = orderDetail.findIndex(order => order.Id == Id);
        if (index == -1) {
            orderDetail.push(product);
        } else {
            orderDetail[index].quantity = orderDetail[index].quantity + 1;
        }
        console.log(orderDetail);
        localStorage.setItem("cart", JSON.stringify(orderDetail));
    } else {
        let arr = [
            {
                Id: 0,
                quantity: 0,
                price: 0,
                name: "",
                image: "",
            }
        ]
        localStorage.setItem("cart", JSON.stringify(arr));
        let orderDetail = JSON.parse(localStorage.getItem("cart"));
        orderDetail.push(product);
        console.log(orderDetail);
        localStorage.setItem("cart", JSON.stringify(orderDetail));
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    })

    Toast.fire({
        type: 'success',
        title: 'Đã thêm vào giỏ hàng'
    })
}
export function CountQuantityInCart(): number {
    if (localStorage.getItem("cart")) {
        let total = 0;
        let s = JSON.parse(localStorage.getItem("cart"));
        s.forEach(cart => {
            total = total + cart.quantity;
        });
        return total;
    } else {
        return 0;
    }
}
