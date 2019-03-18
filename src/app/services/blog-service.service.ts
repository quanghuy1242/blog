import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';

import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import MarkdownIt from 'markdown-it';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  blogCollection: AngularFirestoreCollection<Blog>;
  blogDoc: AngularFirestoreDocument<Blog>;
  length: number = 0;
  currentLimit: number = 4;
  md = new MarkdownIt();

  constructor(
    private readonly db: AngularFirestore
  ) { }
  
  /** GET all blogs from server */
  getBlogs(number: number): Observable<Blog[]> {
    if (number === -1) {
      this.blogCollection = this.db.collection<Blog>("blogs", ref => ref.orderBy('day', 'desc'));
    }
    else {
      this.blogCollection = this.db.collection<Blog>("blogs", ref => ref.orderBy('day', 'desc').limit(number));
    }
    return this.blogCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let previewMardown: string;
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        if (data.isRichContent) {
          previewMardown = /[^[\>]+(?=<)/g.exec(this.md.render(data.content).split('\n')[0])[0];
        }
        return { id, ...data, previewMardown: previewMardown };
      }))
    );
  }

  /** GET blog by id */
  getBlog(id: string): Observable<Blog> {
    return this.db.doc<Blog>('blogs/' + id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, ...data }
      })
    )
  }

  /** GET length of collection */
  getBlogsLength(): void {
    this.blogCollection = this.db.collection<Blog>("blogs");
    this.blogCollection.valueChanges().subscribe(c => this.length = c.length);
  }

}
