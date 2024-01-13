import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  userRole:any;
  returnUrl:any;
  limit = 2;

  user = environment.users;
  address = environment.address;
  booking = environment.booking;

  constructor(private _http:HttpClient, private _route:Router,
    private route:ActivatedRoute) { }

  signup(users:any)
  {
    this._http.post<any>( this.user + '/register', JSON.stringify(users), this.httpOptions).subscribe((result)=>
    {
      alert(result.message)
    },
    error=>
    {
      alert(JSON.stringify(error))
    })
  }

  userlogin(login:any)
  {
    this._http.post( this.user + '/login', JSON.stringify(login), this.httpOptions).subscribe(res=>
    {
      alert("Logged in Successfully!");
      this.token(JSON.stringify(res));

      this._http.get<any>(this.user,this.httpOptions).subscribe(res=>
      {
        const user = res.find((a:any)=>
        {
          return a.email === login.email && a.password === login.password;
        });
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user))
        }
      });

        this.userRole = this.getRole();

        this.returnUrl = this.route.snapshot.queryParams['returnurl'];
        if(this.returnUrl)
        {
          this._route.navigateByUrl(this.returnUrl);
        }
        else
        {
          if(this.userRole === true)
          {
            this._route.navigate(['dashboard'])
          }
          else
          {
            this._route.navigate([''])
          }
        }
      })
    }

    getUserById(id:any)
    {
      return this._http.get(this.user +'/' + id)
    }

  signOut()
  {
    localStorage.removeItem('token');
    this._route.navigate([''])
  }

  //Store th token in local storage
  token(tokenValue: string)
  {
    localStorage.setItem('token', tokenValue)
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  isloggedIn() : boolean
  {
    return !!localStorage.getItem('token');
  }

  getRole()
  {
    let jwt:any = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.stringify(decodedJwtJsonData)
    let isAdmin = decodedJwtData.includes('admin');
    if(isAdmin === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  UserAddress(data:any)
  {
    return this._http.post(this.address, data);
  }

  //get address by userId
  getAddressByUserId(id:any)
  {
    return this._http.get(this.address + `/AddressByUserid?id=${id}`).pipe(map((response:any)=>
    {
      const address =response.slice(0, this.limit);
      return address;
    }))
  }

  getAddressByAddressId(id:number)
  {
    return this._http.get(this.address + `/getaddressbyaddressid?addressid=${id}`)
  }

  getBookingDetails(id:any)
  {
    return this._http.get(this.booking +`/getOrdersbyUserId?id=${id}`);
  }

  cancelOrders(id:any)
  {
    return this._http.delete(this.booking + `/Cancelorders?id=${id}`)
  }

  updateProfile(id:any, value:any)
  {
    return this._http.put(this.user + `/${id}`, value)
  }

}

