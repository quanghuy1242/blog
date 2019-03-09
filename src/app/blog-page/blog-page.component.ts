import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }
}
