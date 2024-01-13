import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricerange'
})
export class PricerangePipe implements PipeTransform {

  transform(products: any[], selectedprice:number): any[]
  {
    if(!products || !selectedprice)
    {
      return products;
    }
    return products.filter(products => products.productPrice <= selectedprice);
  }
}
