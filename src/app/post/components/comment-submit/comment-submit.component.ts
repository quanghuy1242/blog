import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from "@angular/router"
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-comment-submit',
  templateUrl: './comment-submit.component.html',
  styleUrls: ['./comment-submit.component.css']
})
export class CommentSubmitComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  name = this.authService.UserInfo().email.split('@')[0]

  constructor(
    private commentService: CommentService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  submitCommit(name: string, content: string): void {
    if (content === "") return;
    this.commentService.postCommnetss(this.id, { name: name, date: (new Date()) as unknown as Timestamp, content: content })
  }

}
