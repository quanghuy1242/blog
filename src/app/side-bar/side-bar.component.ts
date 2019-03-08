import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() blogs: Blog[];

  constructor() { }

  ngOnInit() {
  }

  scrollTo(id: string): void {
    document.querySelector(`app-blog-detail #${id}`).scrollIntoView();
  }

}
