import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments: Comment[];
  loadComment: boolean = true;
  length: number;
  
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }
}
