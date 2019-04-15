import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from '../../../core/services/blog-service.service';
import { Blog } from '../../../core/models/blog.model';
import { Comment } from '../../../core/models/comment.model';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import MarkdownIt from 'markdown-it';
import { StringModify } from '../../../util/stringModify';
import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import removeMd from 'remove-markdown';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPageComponent implements OnInit {
  blog: Blog;
  comments: Comment[];
  id: string;
  name: string;
  richContent: string;
  category: Category;

  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private commentService: CommentService,
    private router: Router,
    public authService: AuthService,
    private categoryService: CategoryService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getBlog(this.id);
    this.getCommentsBlog(this.id);
  }

  getBlog(id: string): void {
    this.blogService.getBlog(id).subscribe(blog => {
      if (!blog.title) {
        this.router.navigate(['/404']);
      } else {
        const nameGetted: string = StringModify.toUrlString(blog.title);
        if (nameGetted !== this.name) {
          this.router.navigate([`post/${nameGetted}/${blog.id}`]);
          return;
        }
        this.blog = blog;
        this.getCategory();
        this.richContent = this.md.render(this.blog.content);
        this.setMetaData(blog, nameGetted);
      }
    });
  }

  getCommentsBlog(id: string): void {
    this.commentService.getCommentss(this.id).subscribe(comments => {
      this.comments = comments;
    });
  }

  getCategory(): void {
    this.categoryService
      .getCategory(this.blog.category)
      .subscribe(category => (this.category = category));
  }

  setMetaData(data, nameGetted) {
    this.title.setTitle(data.title + ' - Quang Huy');

    let description = removeMd(data.content.split('\n')[0].split(' ').slice(0, 40).join(' '));
    let image = "";
    let rs = /!\[.*?\]\((.*?)\)/.exec(data.content) || /<img src="(.*?)" alt="(.*?)" \/>/.exec(data.content);
    if (rs) { image = rs[1] }
    else {
      image = "https://raw.githubusercontent.com/quanghuy1242/MyLibary/master/images/cover2.jpg";
    }

    this.meta.updateTag({ 'name': 'keywords', 'content': 'Quang Huy Blog' });
    this.meta.updateTag({ 'name': 'description', 'content': description });
    this.meta.updateTag({ 'name': 'twitter:card', 'content': 'summary_large_image' });
    this.meta.updateTag({ 'name': 'twitter:title', 'content': data.title + ' - Quang Huy' });
    this.meta.updateTag({ 'name': 'twitter:text:title', 'content': data.title + ' - Quang Huy' });
    this.meta.updateTag({ 'name': 'twitter:description', 'content': description });
    this.meta.updateTag({ 'name': 'twitter:image', 'content': image });
    this.meta.updateTag({ 'name': 'twitter:image:alt', 'content': data.title + ' - Quang Huy' });
    this.meta.updateTag({ 'property': 'og:title', 'content' : data.title + ' - Quang Huy' });
    this.meta.updateTag({ 'property': 'og:url', 'content': `https://quanghuy.netlify.com/post/${nameGetted}/${data.id}` });
    this.meta.updateTag({ 'property': 'og:image', 'content': image });
    this.meta.updateTag({ 'property': 'og:image:alt', 'content': data.title + ' - Quang Huy' });
    this.meta.updateTag({ 'property': 'og:description', 'content': description });
  }
}
