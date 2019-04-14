import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { StringModify } from '../../../util/stringModify';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  id: string;
  nameId: string;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nameId = this.route.snapshot.paramMap.get('name');
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.getCategory(this.id).subscribe(category => {
      if (!category.name) { this.router.navigate(['/404']); } else {
        if (this.nameId !== category.nameId) {
          this.router.navigate([`category/${category.nameId}/${category.id}`]);
          return;
        }
        this.category = category;
      }
    });
  }

}
