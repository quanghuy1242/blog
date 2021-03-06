import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BlogServiceService } from './services/blog-service.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { ConfService } from './services/conf.service';
import { RepoService } from './services/repo.service';
import { AuthGuard } from './guard/auth.guard';
import { RedirectGuard } from './guard/redirect.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthService,
    BlogServiceService,
    CategoryService,
    CommentService,
    ConfService,
    RepoService,
    AuthGuard,
    RedirectGuard
  ]
})
export class CoreModule {}
