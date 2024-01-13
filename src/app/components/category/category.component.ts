import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //Products and categories
  products:any[] = [];
  public productCategory : any
  selectedcategory:any;

  /*pagination*/
  datalists : any[] = [];
  pagesizes = 5;
  current_page = 1;

  //Slider
  selectedprice: number = 0;

  constructor(private _product:ProductsService, private activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.productList();
    this.selectedcategory = this.activatedroute.snapshot.params['category'];
  }

  //pagination
  onPageChanged(event: PageChangedEvent): void
  {
    this.current_page = event.page;
  }

  //listing the products
  productList()
  {
    this._product.getallProducts().subscribe(result=>
      {
        this.products = result;
        this.productCategory = result;
      })
  }

  productfilter(category:string)
  {
    this.productCategory = this.products.filter((sportsproducts:any)=>
    {
      if(sportsproducts.category === category || category==='')
      {
        return sportsproducts;
      }
    })
  }

}
