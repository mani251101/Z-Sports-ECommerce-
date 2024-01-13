import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offers'
})
export class OffersPipe implements PipeTransform {

  transform(value: any): any
  {
    const offer = value - (20/100) * value;
    return offer;
  }

}
