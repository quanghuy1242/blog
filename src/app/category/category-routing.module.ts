import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCategoryComponent } from './components/post-category/post-category.component';

const routes: Routes = [
  { path: ':name/:id', component: PostCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
