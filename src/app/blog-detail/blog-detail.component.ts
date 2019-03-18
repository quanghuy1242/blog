import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
import { Count } from '../models/count';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  @Input() blog: Blog;
  richContentPreview: string;

  constructor() { }

  ngOnInit() {
    // this.richContentPreview = /[^[\>]+(?=<)/g.exec(this.md.render(this.blog.content).split('\n')[0])[0];
  }

  saveWindowPostision() {
  	Count.scrollYPostion = window.scrollY;
    Count.detailEntered = 1;
  }
}
