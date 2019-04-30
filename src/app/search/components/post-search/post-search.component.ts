import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogServiceService } from 'src/app/core/services/blog-service.service';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/core/models/blog.model';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  typeSearch: string;
  query: string;
  blogs: Blog[];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.typeSearch = this.route.snapshot.paramMap.get('type');
    if (this.typeSearch !== 'tag') {
      this.router.navigate(['404']);
    }
    this.query = this.route.snapshot.paramMap.get('query');
    this.getPostByTag(this.query);
  }

  getPostByTag(query: string): void {
    this.blogService.getPostByTag(query).subscribe(blogs => this.blogs = blogs);
  }

}
