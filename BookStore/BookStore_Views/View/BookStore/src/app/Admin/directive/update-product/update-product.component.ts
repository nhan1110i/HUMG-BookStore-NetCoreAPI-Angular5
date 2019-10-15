import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product/product.service'
import { CategoryService } from '../../services/category/category.service';
import { AuthorService } from '../../services/author/author.service';
import { PublishingService } from '../../services/publishing/publishing.service';
import {alert} from '../../config/config'
declare var require: any
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
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
    createAt: "",
    updateAt: "",
  }
  productTemp = this.product;
  alert : any;
  categories: any;
  authors: any;
  publishings: any;
  selectedImage: File;
  localUrl: string;
  // action
  updateProduct() {
    if (this.selectedImage != null) {
      const fd = new FormData();
      fd.append("Image", this.selectedImage, this.selectedImage.name);
      this.productService.upLoadImage(fd).subscribe(
        imageName => {
          this.product.productImageList = imageName;
          this.productService.updateProduct(this.product).subscribe(
            rs => {
              this.alert = alert.update;
              this.product = this.productTemp;
              this.localUrl = null;
            }, error => {
              console.log(error);
            }
          )
        }, err => {
          console.log(err);
        }
      )
    }else{
      this.productService.updateProduct(this.product).subscribe(
        rs => {
          this.alert = alert.update;
          this.product = this.productTemp;
          this.localUrl = null;
        }, error => {
          console.log(error);
        }
      )
    }
    
  }
  goBack() {
    this.location.back();
  }

  //get form
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
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (rs) => {
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
        this.authors = rs;
      }, (err) => {
        console.log(err);
      }
    )
  }
  getPublishings(): void {
    this.publishingService.getPublishings().subscribe(
      (rs) => {
        this.publishings = rs
      }, (err) => {
        console.log(err)
      }
    )
  }
  getProduct() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(
      rs => {
        this.product = rs;
        this.localUrl = "https://localhost:44315/image/" + this.product.productImageList;
      }, err => {
        console.log(err)
      }
    )
  }
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private publishingService: PublishingService
  ) { }

  ngOnInit() {
    this.getProduct(),
      this.getCategories(),
      this.getAuthors(),
      this.getPublishings()
  }

}
