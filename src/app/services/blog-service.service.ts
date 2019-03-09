import { Injectable } from '@angular/core';
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
export class BlogServiceService {
  blogCollection: AngularFirestoreCollection<Blog>;
  blogDoc: AngularFirestoreDocument<Blog>;

  constructor(
    private readonly db: AngularFirestore
  ) { }
  
  /** GET all blogs from server */
  getBlogs(): Observable<Blog[]> {
    this.blogCollection = this.db.collection<Blog>("blogs");
    return this.blogCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        return { id, ...data };
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

}
