import { Component, OnInit, Input } from '@angular/core';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';
import { Count } from '../models/count';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @Input() categoryInput: string;
  blogs: Blog[];

  constructor(
    public blogService: BlogServiceService
  ) { }

  ngOnInit() {
    // this.blogService.currentLimit = 4;
    if (!this.categoryInput) {
      this.blogService.getBlogsLength();
      this.getBlogs(this.blogService.currentLimit);
    } else {
      this.blogService.getBlogsLength(this.categoryInput);
      this.getBlogs(this.blogService.currentLimit, this.categoryInput);
    }
    this.restoreWindowPostion();
  }

  restoreWindowPostion(): void {
    setTimeout(() => {
      if (Count.detailEntered) {
        window.scrollTo(0, Count.scrollYPostion);
        Count.detailEntered = 0;
      }
    }, 500);
  }

  getBlogs(a: number, c?: string): void {
    if (!c) {
      this.blogService.getBlogs(a).subscribe(blogs => this.blogs = blogs);
    } else {
       this.blogService.getBlogs(a, c).subscribe(blogs => this.blogs = blogs);
    }
    

  }

  loadMore(): void {
    if (!this.categoryInput) {
      this.getBlogs(this.blogService.currentLimit+=4);
    } else {
      this.getBlogs(this.blogService.currentLimit+=4, this.categoryInput);
    }
  }
}
