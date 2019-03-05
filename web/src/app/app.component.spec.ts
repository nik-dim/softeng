import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from '@components/map/map.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { NavComponent } from '@components/nav/nav.component';
import { ShopsComponent } from '@components/shops/shops/shops.component';
import { ProductsComponent } from '@components/products/products/products.component';
import { ProductAddComponent } from '@components/products/product-add/product-add.component';
import { ProductDetailsComponent } from '@components/products/product-details/product-details.component';
import { AboutComponent } from '@components/about/about.component';
import { LoginComponent } from '@components/user/login/login.component';
import { SignupComponent } from '@components/user/signup/signup.component';
import { ProfileComponent } from '@components/user/profile/profile.component';
import { AuthenticationService } from '@services/authentication.service';
import { ShopService } from '@services/shop.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        RouterTestingModule
      ],
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
        ProfileComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
