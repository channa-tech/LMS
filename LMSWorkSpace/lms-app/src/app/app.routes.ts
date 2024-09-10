import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { FormarrayComponent } from './formarray/formarray.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },

    {
        path: 'home',canActivate:[AuthGuard],  component: HomeComponent
    },
    {
        path: 'about', canActivate:[AuthGuard], component: AboutComponent
    },
    {
        path: 'admin',  component: AdminComponent
    },
    {
        path:'formarray',component:FormarrayComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: "full"
    },
    {
        path: '**', redirectTo: 'login'
    },
];
