import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { MapComponent } from '@components/map/map.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { LoginComponent } from '@components/user/login/login.component';
import { SignupComponent } from '@components/user/signup/signup.component';
import { ProductsComponent } from '@components/products/products/products.component';

const routes: Routes = [
  { path: "", component: MapComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "products", component: ProductsComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
