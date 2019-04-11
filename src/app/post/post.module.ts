import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentSubmitComponent } from './components/comment-submit/comment-submit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlogPageComponent,
    CommentItemComponent,
    CommentComponent,
    CommentSubmitComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
