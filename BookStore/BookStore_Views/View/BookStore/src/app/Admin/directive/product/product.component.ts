import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { formatCurrency } from '../../config/config';
import { AdminService } from '../../AdminService/admin.service';
import { alert } from '../../config/config';
import { CategoryService } from '../../services/category/category.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;
  selectedProducts: number[] = [0, 0];
  pageSize : number = 5;
  categories : any;
  productsTemp : any;
  filter : any = {
    category : 0,
    price : 0,
    active : 0,
  }
  filterProducts(){
    this.products = this.productsTemp;
    console.log(this.filter)
    if(this.filter.category !== 0){
      this.products = this.products.filter(product => product.category.id == this.filter.category);
    }
    if(this.filter.price !== 0){
      this.products = this.products.filter(product => product.product.productDiscount > +this.filter.price)
    }
    if(+this.filter.active !== 0){
      let s : boolean = this.filter.active == 1 ? true : false;
      this.products = this.products.filter(product => product.product.isActive == s);
    } 
  }
  changePageSize(itemsPerPage : number){
    this.pageSize = 5;
  }
  // action
  getProducts(): any {
    this.productService.getProducts().subscribe(
      rs => {
        this.products = rs;
        this.productsTemp = rs;
      }, err => {
        console.log(err);
      }
    )
  }
  getCategory() : any{
    this.categoryService.getCategories().subscribe(
      rs =>{
        this.categories = rs;
        console.log(this.categories)
      }, err=>{
        console.log(err);
      }
    )
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            this.alert = alert.error;
            break;
          }
          case 2: {
            this.alert = alert.expire;
            break;
          }
          case 3: {
            this.alert = alert.auth;
            break;
          }
          default: {
            this.products.splice(this.products.findIndex(product => product.product.id == id), 1);
            this.alert = alert.delete;
            break;
          }
        }
      })
  }
  deleteProducts() {
    this.productService.deleteProducts(this.selectedProducts).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            this.alert = alert.error;
            break;
          }
          case 2: {
            this.alert = alert.expire;
            break;
          }
          case 3: {
            this.alert = alert.auth;
            break;
          }
          default: {
            this.selectedProducts.shift();
            this.selectedProducts.shift();
            this.selectedProducts.forEach(id => {
              this.products.splice(this.products.findIndex(product => product.product.id == id), 1);
            });
            this.selectedProducts = [0, 0];
            this.alert = alert.delete;
            break;
          }
        }
      }, err => {
        console.log(err)
      }
    )
  }
  // notice
  alert: any;
  getIsActive(isActive: boolean): string {
    if (isActive) {
      return "Đang bán"
    } else {
      return "Không bán"
    }
  }

  //helper
  formatMoney(money: number): string {
    return formatCurrency(money)

  }
  getSelected(id: number): boolean {
    if (this.selectedProducts.indexOf(id) == -1) {
      return false;
    } else {
      return true;
    }
  }
  selectProduct(id: number) {
    if (this.getSelected(id)) {
      this.selectedProducts.splice(this.selectedProducts.indexOf(id), 1)
    } else {
      this.selectedProducts.push(id)
    }
  }
  unSelect() {
    this.selectedProducts = [0, 0];
  }

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts(),
    this.getCategory()
  }

}
