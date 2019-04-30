import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
