import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from '@components/map/map.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { ProductsComponent } from '@components/products/products/products.component';
import { ShopsComponent } from '@components/shops/shops/shops.component';
import { ProductDetailsComponent } from '@components/products/product-details/product-details.component';

const routes: Routes = [
  { path: "", component: MapComponent },
  { path: "products", component: ProductsComponent},
  { path: "products/:id", component: ProductDetailsComponent},
  { path: "shops", component: ShopsComponent},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
