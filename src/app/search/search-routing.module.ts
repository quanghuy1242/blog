import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostSearchComponent } from './components/post-search/post-search.component';

const routes: Routes = [
  { path: 'search/:type/:query', component: PostSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
