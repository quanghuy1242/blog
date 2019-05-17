import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectGuard } from './core/guard/redirect.guard';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },
  { path: 'post', loadChildren: './post/post.module#PostModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {
    path: 'project-showcase',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: { externalUrl: 'https://project-showcase.netlify.com' }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
