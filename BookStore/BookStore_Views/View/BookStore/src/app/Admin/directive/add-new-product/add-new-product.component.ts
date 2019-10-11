import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category/category.service'
import { AuthorService } from '../../services/author/author.service';
import { PublishingService } from '../../services/publishing/publishing.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  categories : Array<any>;
  publishings: any;
  authors: any;
  product : any={
    productName: "",
    productCode: "",
    productPrice: 0,
    productDiscount: 0,
    authorId: 0,
    productDescription: "",
    categoryId: 0,
    publishingId: 0,
    isActive: true,
    productImage: ""
    // this.categories[1].category.id
  }
  // action
  insertProduct(product : any){
    console.log(product)
    console.log(this.file);
  }
  localUrl: any[];
  showFile(event: any) {
    console.log(event)
      if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
              this.localUrl = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
      }
  }
  file : File;
  // get form
  getCategories() :void{
    this.categoryService.getCategories().subscribe(
      (rs)=>{
        rs.unshift({
          category : {
            id : 0,
            categoryName: "Select Category"
          }
        })
        this.categories = rs;
        
    console.log(this.categories)
      },(err)=>{
        console.log(err);
      }
    )
  }
  getAuthors() : void{
    this.authorService.getAuthors().subscribe(
      (rs)=>{
        rs.unshift({
          
            id : 0,
            authorName: "Select Author"
          
        })
        this.authors = rs;
      },(err)=>{
        console.log(err);
      }
    )
  }
  getPublishings() : void{
    this.publishingService.getPublishings().subscribe(
      (rs)=>{
        rs.unshift({

            id : 0,
            publishingName: "Select Publishing"

        })
        this.publishings = rs
      },(err)=>{
        console.log(err)
      }
    )
  }
  constructor(
    private categoryService : CategoryService, 
    private authorService : AuthorService,
    private publishingService: PublishingService
    ) { }

  ngOnInit() {
    this.getCategories(),
    this.getAuthors(),
    this.getPublishings(),
    console.log(this.product)
  }

}
