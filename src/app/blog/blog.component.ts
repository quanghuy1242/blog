import { Component, OnInit, AfterContentInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterContentInit {
  blogs: Blog[];
  blogLength: number;
  c: number = 4;

  constructor(
    public blogService: BlogServiceService
  ) { }

  ngOnInit() {
    this.blogService.getBlogsLength();
    this.getBlogs(this.c);
  }

  ngAfterContentInit() {
    this.blogLength = this.blogService.length;
  }

  getBlogs(a): void {
    this.blogService.getBlogs(a).subscribe(
      blogs => this.blogs = blogs
    );
  }

  loadMore(): void {
    this.getBlogs(this.c+=4);
  }
}
