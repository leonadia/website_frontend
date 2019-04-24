import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import { FunToyComponent } from './fun-toy/fun-toy.component';
import { VoteMachineComponent } from './fun-toy/vote-machine/vote-machine.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'funToy', component: FunToyComponent},
  {path: 'funToy/vote-machine', component: VoteMachineComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
