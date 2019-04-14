import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from '../../../core/services/blog-service.service';
import { Blog } from '../../../core/models/blog.model';
import { Comment } from '../../../core/models/comment.model';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import MarkdownIt from 'markdown-it';
import { StringModify } from '../../../util/stringModify';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPageComponent implements OnInit {
  blog: Blog;
  comments: Comment[];
  id: string;
  name: string;
  richContent: string;
  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private commentService: CommentService,
    private titleService: Title,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getBlog(this.id);
    this.getCommentsBlog(this.id);
  }

  getBlog(id: string): void {
    this.blogService.getBlog(id).subscribe(blog => {
      if (!blog.title) {
        this.router.navigate(['/404']);
      } else {
        const nameGetted: string = StringModify.toUrlString(blog.title);
        if (nameGetted !== this.name) {
          this.router.navigate([`post/${nameGetted}/${blog.id}`]);
          return;
        }
        this.blog = blog;
        this.richContent = this.md.render(this.blog.content);
        this.titleService.setTitle(blog.title + ' - Quang Huy');
      }
    });
  }

  getCommentsBlog(id: string): void {
    this.commentService.getCommentss(this.id).subscribe(comments => {
      this.comments = comments;
    });
  }
}
