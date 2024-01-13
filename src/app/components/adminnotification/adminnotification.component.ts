import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.css']
})
export class AdminnotificationComponent implements OnInit
{
  notifications: string = '';

  constructor(private _product:ProductsService){}

  ngOnInit(): void {
    this.getNotify();
  }

  getNotify()
  {
    this._product.getNotify().subscribe(message=>
      {
        this.notifications = message;
        console.warn(this.notifications = message);

      });
  }
}
