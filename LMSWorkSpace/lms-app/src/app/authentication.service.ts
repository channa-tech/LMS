import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
isloggedIn:boolean=false;
  constructor() { }
  authenticate(username:string,password:string){
    this.isloggedIn=username==password;
  }
}
