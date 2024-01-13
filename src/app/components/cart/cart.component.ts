import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit
{
  users:any = localStorage.getItem('user');
  loggedinUser = JSON.parse(this.users);

  totalamount:number = 0
  value:any;
  myCarts:any;
  Total:number = 0
  body:any;
  originaldata:any;

  constructor(public auth:AuthService, private product:ProductsService){}

  ngOnInit(): void {
    this.cartdetails();
    this.settime();
  }

  cartdetails()
  {
    this.auth.getUserById(this.loggedinUser.userId).subscribe(result=>
    {
      this.value = result;
      this.myCarts = this.value.myCarts;
      this.Total = this.myCarts.length;
      this.totalamount = 0;
      this.myCarts.forEach((calc:any) =>
      {
        this.totalamount = Number(calc.productPrice) + this.totalamount
      });
    })
  }

  quantity(value:any, products:any)
  {
    this.product.getProductsById(products.productId).subscribe((res) =>
    {
      this.originaldata = res;

    const index = this.myCarts.findIndex((item:any)=> item.productId === products.productId)

    if(value == "max")
    {
      products.count = parseInt(products.count) +1 ;
      products.productPrice = parseInt(products.productPrice) + parseInt(this.originaldata.productPrice);

    }
    else if(value == "min")
    {
      products.count = parseInt(products.count) -1;
      products.productPrice = parseInt(products.productPrice) - parseInt(this.originaldata.productPrice);
    }

    const cartvalue = {
      productId:products.productId,
      productName:products.productName,
      productPrice:products.productPrice,
      category:products.category,
      description:products.description,
      highlights:products.highlights,
      count:products.count,
      imageUrl:products.imageUrl
    }

    this.body = [{op:'replace',path:'/myCarts/' + index, value:cartvalue}];

    this.product.updateCartCount(this.loggedinUser.userId, this.body).subscribe(result=>
      {
        alert("Product Updated");
      })
    });
  }

  deletecartItem(id:any)
  {
    this.product.deleteProductFromCart(id).subscribe(res=>
      {
        this.totalamount = 0;
        alert("Product removed from cart");
        this.ngOnInit();
      })
  }

  settime()
  {
    setInterval(()=>
    {
      this.cartdetails();
    }, 1000)
  }
}
