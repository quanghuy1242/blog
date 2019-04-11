import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
