import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {
  id: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  	this.id = this.route.snapshot.paramMap.get('id');
  }

}
