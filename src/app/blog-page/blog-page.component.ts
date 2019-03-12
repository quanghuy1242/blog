import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from '../services/blog-service.service';
import { Blog } from '../models/blog.model';
import { Title } from '@angular/platform-browser';
import {Router} from "@angular/router"

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blog: Blog;

  comments = [
    {
      name: "Quang Huy",
      date: "15/5/2019",
      comment: "Hay quá đi!"
    },
    {
      name: "Minh Chánh",
      date: "17/5/2019",
      comment: "Chưa bao giờ đọc cái gì hay đến như vậy!"
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id).subscribe(blog => {
      if (!blog.title) {
        this.router.navigate(['/404']);
      } else {
        this.blog = blog;
        this.titleService.setTitle(blog.title + ' - Quang Huy');
      }
    });
  }
}
