import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './about/about.component';
import { BlogAddComponent } from './blog-add/blog-add.component'
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { StoresComponent } from './stores/stores.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/add', component: BlogAddComponent },
  { path: 'blogs/:id', component: BlogDetailComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'stores/:id', component: StoreDetailComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
