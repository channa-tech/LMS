import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
{
    path:'login',component:LoginComponent
},
{
    path:'', component:LoginComponent,pathMatch:"full"
},
{
    path:'lms',component:DashboardComponent,canActivate:[ AuthGuard],children:[
        {
            path:'home',component:HomeComponent
        },
        {
            path:'about',component:AboutComponent
        },
        {
            path:'admin',component:AdminComponent
        },
        {
            path:'',redirectTo:'home',pathMatch:'full'
        }
    ]
}
];
