import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OfferService } from 'src/app/services/offer.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  product: any[] = [];
  products:any;
  public productCategory : any
  offers:any;

  constructor(private _productservice: ProductsService,
    public offer:OfferService, private logger: NGXLogger){}

  ngOnInit(): void {
      this.featuredProducts();
  }

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
    dots: true,
    autoplay:true,
    autoplaySpeed: 200,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      768: {
        items: 3
      },
      1024: {
        items: 4
      }
    },
  }

  featuredProducts()
  {
    this._productservice.featuredProducts().subscribe(result=>
    {
      this.products = result;
      this.logger.log(result);
    },
    error=>
    {
      this.logger.error(error);
    })
  }



}
