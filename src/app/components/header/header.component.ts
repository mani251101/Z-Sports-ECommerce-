import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchValue:any;

  users:any;
  loggedinUser:any;
  public firstname:any;
  public lastname:any;

  constructor(public service:AuthService, private product:ProductsService, private _route: Router){}

  ngOnInit(): void {
    this.setTimer();
  }

  //Logout
  logout()
  {
    this.service.signOut();
  }

  productSearch(queries: KeyboardEvent)
  {
    if(queries)
    {
      const value = queries.target as HTMLInputElement;
    }
  }

  onSearch(query:KeyboardEvent)
  {
    if(query)
    {
      const productData = query.target as HTMLInputElement;
      this.product.searchProduct(productData.value).subscribe(result=>
        {
          if(result.length>5)
          {
            result.length = length
          }
          this.searchValue = result
        })
    }
  }

  hidetheSearch()
  {
    this.searchValue = undefined
  }

  redirectToDetails(id:number){
    this._route.navigate(['/productdetails/'+id])
  }

  submitSearch(val:string)
  {
    this._route.navigate([`search/${val}`]);
  }

  getUserDetails()
  {
    this.users = localStorage.getItem('user');
    this.loggedinUser = JSON.parse(this.users);
    this.firstname = this.loggedinUser.firstName;
    this.lastname = this.loggedinUser.lastName;
  }

  setTimer()
  {
    setInterval(()=>
    {
      this.getUserDetails();
    },500)
  }
}

