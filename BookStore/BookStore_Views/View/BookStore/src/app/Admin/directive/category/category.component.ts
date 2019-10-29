import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category/category.service';
import { alert, alert2 } from '../../config/config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // getCaegories

  categories: any;
  parentCategories: any;
  order: number = 1;
  categoryActive = "Đang kích hoạt"
  constructor(private categoryService: CategoryService) { }
  //
  // get Categories
  getCategories(): void {
    this.categoryService.getCategories().subscribe((rs) => {
      this.categories = rs;
    }, (err) => {
      console.log(err);
    })
  }
  // click item
  categorySelected: any;
  selectCategory(category: any) {
    this.categorySelected = category;
    console.log(this.categorySelected)
  }
  // delete category
  deleteCategory(Id: number) {
    this.categoryService.deleteCategory(Id).subscribe(
      (rs) => {
        console.log(rs);
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            this.categories.splice(this.categories.findIndex(category => category.category.id == Id), 1);
            alert2('DELETE', 'Đã xóa danh mục thành công','success');
            break;
          }
        }
      }, (err) => {
        console.log("cant delete");
      }
    )
  }
  // update category
  updateCategory(category: any) {
    this.categoryService.updateCategory(category).subscribe(
      rs => {
        console.log(rs);
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            this.categorySelected.category.parentId = +this.categorySelected.category.parentId;
            this.categorySelected.parentCategory.id = this.categorySelected.category.parentId;
            this.categorySelected.parentCategory.parentName = this.parentCategories[this.parentCategories.findIndex(obj => obj.id == this.categorySelected.category.parentId)].parentName;
            alert2('UPDATE', 'Đã cập nhật danh mục thành công','success');
            this.categorySelected = null;
            break;
          }
        }

      }, (err) => {
        console.log(err)
      }
    )

  }
  // Add new Category
  addNewCategory(category: any) {
    if (category.value.isActive == null) {
      category.value.isActive = false;
    }
    this.categoryService.addCategory(category.value).subscribe((rs) => {
      switch (rs.Error) {
        case 1: {
          alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
          break;
        }
        case 2: {
          alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
          break;
        }
        case 3: {
          alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
          break;
        }
        default: {
          this.categories.push({
            id: 0,
            category: category.value,
            parentCategory: {
              id: this.parentCategories[this.parentCategories.findIndex(obj => obj.id == category.value.parentId)].id,
              parentName: this.parentCategories[this.parentCategories.findIndex(obj => obj.id == category.value.parentId)].parentName
            }
          })
          console.log(rs);
          alert2('INSERT', 'Đã thêm mới danh mục thành công','success');

          break;
        }
      }
    }, (err) => { console.log(err) })
  }
  // Get ParentCategories
  getParentCategories(): void {
    this.categoryService.getParentCategories().subscribe(
      (rs) => {
        this.parentCategories = rs;

      }, (err) => {
        console.log(err)
      }
    )
  }
  toNumber() {
    this.categorySelected.parentCategory.parentId = +this.categorySelected.parentCategory.parentId
  }


  // notice
  getIsActive(isActive: boolean): string {
    if (isActive) {
      return "Đang mở"
    } else {
      return "Đang đóng"
    }
  }

  getOrder() {
    this.order++;
  }
  alert: any;
  showActive(active: boolean): string {
    if (active == true) {
      return "Actived"
    } else {
      return "NonActive"
    }
  }
  ngOnInit() {
    this.getCategories();
    this.getParentCategories();

  }

}
