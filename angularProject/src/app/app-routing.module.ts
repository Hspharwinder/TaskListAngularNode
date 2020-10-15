import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { AddtaskComponent } from './addtask/addtask.component';

const routes: Routes = [
  { path: '',  redirectTo: '/login',  pathMatch: 'full' },  
  { path: 'login', component: LoginComponent,  }, 
  { path: 'signup', component: SingupComponent,  }, 
  { path: 'home', component: HomeComponent,  }, 
  { path: 'addTask', component: AddtaskComponent,  }, 
  { path: 'app',  component: AppComponent }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const nav = [
                    HomeComponent,
                    AppComponent,
                    PageNotFoundComponent
                  ];
