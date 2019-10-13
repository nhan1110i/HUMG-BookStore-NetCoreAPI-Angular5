import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { formatCurrency } from '../../config/config';
import { AdminService } from '../../AdminService/admin.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;
  selectedProducts: number[] = [0, 0]
  // action
  getProducts(): any {
    this.productService.getProducts().subscribe(
      rs => {
        this.products = rs;
      }, err => {
        console.log(err);
      }
    )
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      rs => {
        this.products.splice(this.products.findIndex(product => product.product.id == id), 1);
      }
    )
  }
  deleteProducts() {
    this.selectedProducts.shift();
    this.selectedProducts.shift();
    this.selectedProducts.forEach(id => {
      this.products.splice(this.products.findIndex(product => product.product.id == id), 1);
    });
    this.productService.deleteProducts(this.selectedProducts).subscribe(
      rs => {
        this.selectedProducts = [0, 0]
      }, err => {
        console.log(err)
      }
    )
  }
  // notice
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
    private adminService : AdminService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

}
