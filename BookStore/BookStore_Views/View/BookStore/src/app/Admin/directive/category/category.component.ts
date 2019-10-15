import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category/category.service';
import {alert} from '../../config/config';

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
  deleteCategory(Id : number){
    this.categoryService.deleteCategory(Id).subscribe(
      (rs) =>{
        this.categories.splice(this.categories.findIndex(category => category.category.id == Id),1);
        this.alert = alert.delete;
      },(err) =>{
        console.log("cant delete");
      }
    )
  }
  // update category
  updateCategory(category: any){
    this.categorySelected.category.parentId = +this.categorySelected.category.parentId;
    this.categorySelected.parentCategory.id = this.categorySelected.category.parentId;
    this.categorySelected.parentCategory.parentName = this.parentCategories[this.parentCategories.findIndex(obj => obj.id == this.categorySelected.category.parentId)].parentName;
    this.categoryService.updateCategory(category).subscribe(
      rs=>{
        this.alert = alert.update;
        this.categorySelected = null;
      },(err)=>{
        console.log(err)
      }
    )
    
  }
  // Add new Category
  addNewCategory(category: any) {
    if(category.value.isActive == null){

    }
    this.categoryService.addCategory(category.value).subscribe((rs) => { 
      this.categories.push({
        id: 0,
        category: category.value,
        parentCategory: {
          id: this.parentCategories[this.parentCategories.findIndex(obj => obj.id == category.value.parentId)].id,
          parentName: this.parentCategories[this.parentCategories.findIndex(obj => obj.id == category.value.parentId)].parentName
        }
      });

      
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
  toNumber(){
    this.categorySelected.parentCategory.parentId = +this.categorySelected.parentCategory.parentId
  }


  // notice
  getIsActive(isActive : boolean): string{
    if(isActive){
      return "Đang mở"
    }else{
      return "Đang đóng"
    }
  }
  
  getOrder(){
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
