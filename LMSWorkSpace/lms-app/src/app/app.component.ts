import { AfterViewInit, Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'lms-app';
  /**
   *
   */
  showHeader():boolean{return this.authservice.isloggedIn;}
  constructor(private authservice:AuthenticationService,private router:Router) {
  }
  menuOpen: boolean = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  Logout(){
    this.authservice.isloggedIn=false;
    this.router.navigate(['login']);
  }
}
