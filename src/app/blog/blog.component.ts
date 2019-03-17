import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';
import { Count } from '../models/count';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[];

  constructor(
    public blogService: BlogServiceService
  ) { }

  ngOnInit() {
    this.blogService.getBlogsLength();
    this.getBlogs(this.blogService.c);
    setTimeout(() => {
      window.scrollTo(0, Count.scrollYPostion);
    }, 500);
  }

  getBlogs(a: number): void {
    this.blogService.getBlogs(a).subscribe(
      blogs => {
        this.blogs = blogs;
      }
    );
  }

  loadMore(): void {
    this.getBlogs(this.blogService.c+=4);
  }
}
