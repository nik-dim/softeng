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
import { ProductDetailsComponent } from '@components/products/product-details/product-details.component';
import { ShopDetailsComponent } from '@components/shops/shop-details/shop-details.component';
import { PriceAddComponent } from '@components/prices/price-add/price-add.component';
import { AdminComponent } from '@components/admin/admin.component';

import { Role } from '@models/role.enum';

const routes: Routes = [
  { path: "", component: MapComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent, canActivate: [AuthGuard], data: { roles: [Role.Simple] } },
  { path: "products", component: ProductsComponent },
  { path: "products/add", component: ProductAddComponent, canActivate: [AuthGuard], data: { roles: [Role.User, Role.Admin] } },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "shops", component: ShopsComponent },
  { path: "shops/:id", component: ShopDetailsComponent },
  { path: "prices/:id", component: PriceAddComponent, canActivate: [AuthGuard], data: { roles: [Role.User, Role.Admin] } },
  { path: "dashboard", component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: "unauthorized", component: UnauthorizedComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
