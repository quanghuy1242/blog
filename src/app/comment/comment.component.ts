import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
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
  
  constructor() { }

  ngOnInit() {
  }

}
