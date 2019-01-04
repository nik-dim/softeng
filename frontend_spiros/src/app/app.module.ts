import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './components/Blog/blogs/blogs.component';
import { BlogAddComponent } from './components/Blog/blog-add/blog-add.component';
import { BlogDetailComponent } from './components/Blog/blog-detail/blog-detail.component';
import { FuelInterceptor } from './interceptors/fuel-interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavComponent } from './components/nav/nav.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogAddComponent,
    BlogDetailComponent,
    PageNotFoundComponent,
    SignUpComponent,
    SignInComponent,
    NavComponent,
    ShopsComponent,
    ShopDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FuelInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
