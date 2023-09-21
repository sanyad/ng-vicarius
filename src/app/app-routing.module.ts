import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {UserComponent} from "./modules/user/user.component";
import {Error403Component} from "./components/error403/error403.component";
import {Error404Component} from "./components/error404/error404.component";

const routes: Routes = [
  {
    path: '403',
    component: Error403Component,
    loadChildren: () => import('./components/error403/error403.module').then(m => m.Error403Module),
  },
  {
    path: '404',
    component: Error404Component,
    loadChildren: () => import('./components/error404/error404.module').then(m => m.Error404Module),
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
