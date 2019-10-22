import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service'
import { AuthorService } from '../../services/author/author.service';
import { PublishingService } from '../../services/publishing/publishing.service';
import { Moment } from 'moment'
import { ProductService } from '../../services/product/product.service';
import { Location } from '@angular/common';
import { alert } from '../../config/config'
var moment = require('moment');
declare var require: any

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  categories: Array<any>;
  publishings: any;
  authors: any;
  product: any = {
    Id: 0,
    productCode: "",
    productName: "",
    productPrice: 0,
    productDiscount: 0,
    productDescription: "",
    productImageList: "",
    productTitle: "",
    categoryId: 0,
    authorId: 0,
    publishingId: 0,
    viewCount: 0,
    rateCount: 0,
    rateTotal: 0,
    isActive: true,
    publishYear: 2019,
    translator: "Nhan",
    createAt: moment().format(),
    updateAt: moment().format(),
    // this.categories[1].category.id
  }

  // action
  public progress: number;
  public message: string;
  localUrl: any[];
  selectedImage: File;
  showFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedImage = <File>event.target.files[0];
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    console.log(this.selectedImage)

  }
  insertProduct() {
    const fd = new FormData();
    fd.append("Image", this.selectedImage, this.selectedImage.name);
    //fd.append("Image","Nhan");
    this.productService.upLoadImage(fd).subscribe(
      rs => {
        console.log(rs);
        this.product.productImageList = rs;
        console.log(this.product);
        this.productService.insertProduct(this.product).subscribe(
          irs => {
            switch (irs.Error) {
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
                this.alert = alert.add;
                break;
              }
            }

          }, (err) => {
            console.log("error")
          }
        )
      }, err => {
        console.log("err");
        console.log(this.product)
      }
    )

  }
  file: File;

  // get form
  alert: any;
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (rs) => {
        rs.unshift({
          category: {
            id: 0,
            categoryName: "Select Category"
          }
        })
        this.categories = rs;

        console.log(this.categories)
      }, (err) => {
        console.log(err);
      }
    )
  }
  getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (rs) => {
        rs.unshift({
          id: 0,
          authorName: "Select Author"

        })
        this.authors = rs;
      }, (err) => {
        console.log(err);
      }
    )
  }
  getPublishings(): void {
    this.publishingService.getPublishings().subscribe(
      (rs) => {
        rs.unshift({

          id: 0,
          publishingName: "Select Publishing"

        })
        this.publishings = rs
      }, (err) => {
        console.log(err)
      }
    )
  }
  goBack() {
    this.location.back();
  }
  constructor(
    private location: Location,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private publishingService: PublishingService
  ) { }

  ngOnInit() {
    this.getCategories(),
      this.getAuthors(),
      this.getPublishings()


  }

}
