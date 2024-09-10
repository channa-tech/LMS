import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(private authservice:AuthenticationService, private router:Router) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    
    if(this.authservice.isloggedIn)
      return true;
    else
    return this.router.navigate(['login']);
  }
  
  // canActivate():boolean {
  //   return this.authservice.isloggedIn;
  // }
  
}

