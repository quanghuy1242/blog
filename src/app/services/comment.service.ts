import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { Blog } from '../models/blog.model';

import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentCollection: AngularFirestoreCollection<Comment>;

  constructor(
    private readonly db: AngularFirestore
  ) { }

  getCommentss(blogId: string): Observable<Comment[]> {
    this.commentCollection = this.db.doc<Blog>(`blogs/${blogId}`).collection('comments');
    return this.commentCollection.valueChanges();
  }
}
