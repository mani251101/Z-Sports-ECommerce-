import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolebasedGuard implements CanActivate {
  constructor(private _auth:AuthService, private route:Router){}

  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
  {
    let jwt:any = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.stringify(decodedJwtJsonData)
    let isAdmin = decodedJwtData.includes(router.data['role']);

    if(isAdmin === true)
    {
      return true
    }
    else
    {
      alert("You are not allowed to access the page");
      this.route.navigate(['']);
      return false
    }

  }

}
