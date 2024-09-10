import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(private route:Router,private authservice:AuthenticationService,
    private fb:FormBuilder) {
   this.userform= this.fb.group({
      username:new FormControl('',[Validators.required,Validators.maxLength(10)]),
      password:new FormControl('',[Validators.required])
    })
  }
  userform!:FormGroup
  login(){
    this.authservice.authenticate(this.userform.value['username'],this.userform.value['password']);
    if(this.authservice.isloggedIn)
      this.route.navigate(['home']);
      
  }
}
