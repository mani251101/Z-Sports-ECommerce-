import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateGuard
{
  canExit: () => boolean | Promise<boolean> | Observable<boolean>
}

@Injectable({
  providedIn: 'root'
})


export class DeactivateGuard implements CanDeactivate<IDeactivateGuard> {

  canDeactivate(
    component: IDeactivateGuard,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>
    {
    return component.canExit();
    }
}
