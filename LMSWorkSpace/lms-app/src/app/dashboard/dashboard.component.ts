import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  /**
   *
   */
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
