import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';
import { Comment } from '../models/comment.model';
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blog: Blog;
  comments: Comment[];
  id: string;
  richContent: string;
  md = new MarkdownIt();

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
    this.getBlog(this.id);
    this.getCommentsBlog(this.id);
  }

  getBlog(id: string): void {
    this.blogService.getBlog(id).subscribe(blog => {
      if (!blog.title) {
        this.router.navigate(['/404']);
      } else {
        this.blog = blog;
        this.richContent = this.md.render(this.blog.content);
        this.titleService.setTitle(blog.title + ' - Quang Huy');
      }
    });
  }

  getCommentsBlog(id: string): void {
    this.commentService.getCommentss(this.id).subscribe(comments => {
      this.comments = comments;
    })
  }
}
