import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category/category.service'
import { AuthorService } from '../../services/author/author.service';
import { PublishingService } from '../../services/publishing/publishing.service';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  categories :any;
  publishings: any;
  authors: any;
  getCategories() :void{
    this.categoryService.getCategories().subscribe(
      (rs)=>{
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
        this.authors = rs;
      },(err)=>{
        console.log(err);
      }
    )
  }
  getPublishings() : void{
    this.publishingService.getPublishings().subscribe(
      (rs)=>{
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
    this.getPublishings()
  }

}
