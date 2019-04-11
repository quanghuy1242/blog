import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BlogServiceService } from './services/blog-service.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { ConfService } from './services/conf.service';
import { RepoService } from './services/repo.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
  	AuthService,
  	BlogServiceService,
  	CategoryService,
  	CommentService,
  	ConfService,
  	RepoService
  ]
})
export class CoreModule { }
