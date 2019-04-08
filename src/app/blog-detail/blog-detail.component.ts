import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
import { Count } from '../models/count';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  @Input() blog: Blog;
  category: Category;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  saveWindowPostision() {
  	Count.scrollYPostion = window.scrollY;
    Count.detailEntered = 1;
  }

  getCategory(): void {
    this.categoryService.getCategory(this.blog.category).subscribe(category => this.category = category);
  }
}
