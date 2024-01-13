import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  details: any;
  categories: any;
  relatedProduct: any;

  users: any = localStorage.getItem('user');
  loggedinUser = JSON.parse(this.users);

  constructor(private activedRouting: ActivatedRoute, private product: ProductsService,
    public auth:AuthService, private _route:Router) { }

  ngOnInit(): void {

    let productId = this.activedRouting.snapshot.params['productId']
    productId && this.product.getProductsById(productId).subscribe((result) => {
      this.details = result;
      this.categories = this.details.category;
      this.category(this.categories);
    })

  }

  category(productCategory: any) {
    this.product.relatedProducts(productCategory).subscribe(result => {
      this.relatedProduct = result;
    },
      error => {
        console.error(error);
      })
  }

  cart(Product: any)
  {
    if(this.auth.isloggedIn()===true)
    {
      this.product.addToCart(this.loggedinUser.userId, Product).subscribe(result =>
        {
          alert("Product Added Successfully.")
        },
        error =>
        {
          console.error(JSON.stringify(error));
        })
    }
    else
    {
      this._route.navigate(['/login']);
    }
  }

  notifyMe()
  {
    const message = `Notify me for Product ${this.details.productName} - ${this.loggedinUser.email}`;
    this.product.notification(message);
    console.warn(message);
  }

  imageChange()
  {

  }
}
