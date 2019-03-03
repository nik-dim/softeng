import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { MapComponent } from '@components/map/map.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { LoginComponent } from '@components/user/login/login.component';
import { SignupComponent } from '@components/user/signup/signup.component';
import { ProductsComponent } from '@components/products/products/products.component';
import { ShopsComponent } from '@components/shops/shops/shops.component';
import { ProductAddComponent } from '@components/products/product-add/product-add.component';
import { UnauthorizedComponent } from '@components/unauthorized/unauthorized.component';

import { Role } from '@models/role.enum';

const routes: Routes = [
  { path: "", component: MapComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent, canActivate: [AuthGuard], data: { roles: [Role.Simple] } },
  { path: "products", component: ProductsComponent },
  { path: "products/add", component: ProductAddComponent, canActivate: [AuthGuard], data: { roles: [Role.User, Role.Admin] } },
  { path: "shops", component: ShopsComponent },
  { path: "unauthorized", component: UnauthorizedComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
