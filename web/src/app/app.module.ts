import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ShopsComponent } from './components/shops/shops/shops.component';
import { ProductsComponent } from './components/products/products/products.component';
import { ProductAddComponent } from './components/products/product-add/product-add.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ShopDetailsComponent } from '@components/shops/shop-details/shop-details.component';
import { AdminComponent } from '@components/admin/admin.component';
import { PriceAddComponent } from '@components/prices/price-add/price-add.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NotFoundComponent,
    NavComponent,
    ShopsComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductDetailsComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    UnauthorizedComponent,
    ShopDetailsComponent,
    AdminComponent,
    PriceAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
