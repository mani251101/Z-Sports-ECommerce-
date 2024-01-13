import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product!: any[]
  id!:number


  searchResult:string = '';

  //pagination
  datalist : any[] = [];
  pagesize = 5;
  currentpage = 1;

  constructor(private productservice: ProductsService){}

  ngOnInit(): void
  {
    this.productservice.getallProducts().subscribe((data:any[])=>
    {
      this.product = data;
    },
    error=>
    {
      alert(JSON.stringify(error))
    })
  }

  list()
  {
    this.productservice.getallProducts().subscribe((result: any[])=>
      {
        this.product = result;
      })
  }


  deleteItem(product:any)
  {
    this.productservice.deleteProduct(product).subscribe(result=>
    {
      alert("Product Deleted Successfully.")
      this.list();
    },
    error=>
    {
      console.error(error);
    })
  }

  //pagination event
  onPageChanged(event: PageChangedEvent): void
  {
    this.currentpage = event.page;
  }

}
