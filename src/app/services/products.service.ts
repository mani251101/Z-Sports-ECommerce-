import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  product = environment.products;
  booking = environment.booking;
  users = environment.users;

  limit = 5;

  user:any;

  //userdetails for payment
  userdetails:any;
  products:any;

  private notifyMessage = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient) { }

  getallProducts()
  {
    return this._http.get<any[]>(this.product)
  }

  getProductsById(id:number)
  {
    return this._http.get<any>(this.product + `/${id}`)
  }

  create(productdata:FormData)
  {
    return this._http.post(this.product, productdata);
  }

  deleteProduct(productId: number)
  {
    return this._http.delete(this.product + productId);
  }

  featuredProducts()
  {
    return this._http.get(this.product).pipe(map((response:any)=>
    {
      const limitproduct = response.slice(0, this.limit);
      return limitproduct;
    }));
  }

  relatedProducts(category:any)
  {
    return this._http.get(this.product + '/api/categories?category=' + category).pipe(map((response:any)=>
    {
      const relatedProduct = response.slice(0, this.limit);
      return relatedProduct
    }));
  }

  addToCart(userId:any, product: any)
  {
    const myProducts = {productId:product.productId,
      productName:product.productName,
      productPrice:product.productPrice,
      category:product.category,
      description:product.description,
      highlights:product.highlights,
      count:product.count,
      imageUrl:product.imageUrl }

    const body = [{op:'add',path:'/myCarts/-', value:myProducts}];
    return this._http.patch(this.users+ '/' + userId + '/user', body, this.httpOptions);
  }

  deleteProductFromCart(id:any)
  {
    return this._http.delete(this.product + `/DeletebyCartId?cartId=${id}`);
  }

  searchProduct(query: string)
  {
    return this._http.get<any[]>(this.product + `/search?query=${query}`);
  }

  //Payment
  onPayment(payment:any)
  {
    return this._http.post(this.booking , payment);
  }

  updateProduct(id:any, products:any)
  {
    return this._http.put(this.product + `/${id}`, products);
  }

  updateCartCount(id:any, body:any)
  {
    return this._http.patch(this.users + `/${id}/user`, body);
  }

  getProductByCategory(category:any)
  {
    return this._http.get(this.product + `/api/categories?category=${category}`);
  }

  updateCart(id:any)
  {
    const body = [{op:'replace', path:'/myCarts', value:[]}]
    return this._http.patch(this.users + '/' + id+ '/user', body, this.httpOptions).subscribe(result=>{});
  }

  updateStocksAvailability(productId:any, body:any)
  {
    return this._http.patch(this.product + `/productbyid?productId=${productId}`, body, this.httpOptions);
  }

  getNotify()
  {
    return this.notifyMessage.asObservable();
  }

  notification(message:string)
  {
    this.notifyMessage.next(message);
  }
}
