import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { StringModify } from '../../../util/stringModify';
import { Meta, Title } from '@angular/platform-browser';

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
    private router: Router,
    private meta: Meta,
    private title: Title
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
        this.setMetaData(category);
      }
    });
  }

  setMetaData(data) {
    this.title.setTitle(data.name);

    this.meta.updateTag({ 'name': 'keywords', 'content': 'Quang Huy Blog' });
    this.meta.updateTag({ 'name': 'description', 'content': data.description });
    this.meta.updateTag({ 'name': 'twitter:card', 'content': 'summary_large_image' });
    this.meta.updateTag({ 'name': 'twitter:title', 'content': data.name });
    this.meta.updateTag({ 'name': 'twitter:text:title', 'content': data.name });
    this.meta.updateTag({ 'name': 'twitter:description', 'content': data.description });
    this.meta.updateTag({ 'name': 'twitter:image', 'content': data.imgUrl });
    this.meta.updateTag({ 'name': 'twitter:image:alt', 'content': data.name });
    this.meta.updateTag({ 'property': 'og:title', 'content' : data.name });
    this.meta.updateTag({ 'property': 'og:url', 'content': `https://quanghuy.netlify.com/category/${data.nameId}/${data.id}` });
    this.meta.updateTag({ 'property': 'og:image', 'content': data.imgUrl });
    this.meta.updateTag({ 'property': 'og:image:alt', 'content': data.name });
    this.meta.updateTag({ 'property': 'og:description', 'content': data.description });
  }

}
