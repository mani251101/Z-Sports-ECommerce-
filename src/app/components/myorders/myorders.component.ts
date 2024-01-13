import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  showproducts:any;

  users:any = localStorage.getItem('user');
  loggedinUser = JSON.parse(this.users);
  userId = this.loggedinUser.userId;

  constructor(private authservice: AuthService){}

  ngOnInit(): void {
    this.getOrderdetails(this.userId);

  }

  getOrderdetails(id:any)
  {
    this.authservice.getBookingDetails(id).subscribe((result:any)=>
      {
        this.showproducts = result;
      })
  }

  cancelOrders(id:any)
  {
    this.authservice.cancelOrders(id).subscribe(result=>
    {
      alert("Your Order has been Cancelled");
      this.ngOnInit();
    })
  }

}
