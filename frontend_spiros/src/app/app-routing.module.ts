import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from '@components/Blog/blogs/blogs.component';
import { BlogDetailComponent } from '@components/Blog/blog-detail/blog-detail.component';
import { BlogAddComponent } from '@components/Blog/blog-add/blog-add.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { SignUpComponent } from '@components/sign-up/sign-up.component';
import { SignInComponent } from '@components/sign-in/sign-in.component';
import { ShopsComponent } from '@components/shops/shops.component';

const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/add', component: BlogAddComponent },
  { path: 'blogs/:id', component: BlogDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'shops', component: ShopsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
