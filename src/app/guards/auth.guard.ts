import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth:AuthService, private _route: Router){}

  canActivate(router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
    {
      if(this._auth.isloggedIn())
      {
        return true;
      }
      else
      {
        this._route.navigate(['login'], {queryParams:{returnurl:state.url}})
        return false;
      }
    }
}
