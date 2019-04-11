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
  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  constructor(
    private readonly db: AngularFirestore
  ) { }
  
  /** GET all blogs from server */
  getBlogs(number: number, categoryId?: string): Observable<Blog[]> {
    return this.db.collection<Blog>("blogs", ref => {
      let query = ref.orderBy('day', 'desc');
      if (number !== -1) { query = query.limit(number) }
      if (categoryId) { query = query.where('category', '==', categoryId) }
      return query;
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let previewMardown: string;
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        if (data.isRichContent) {
        	let content: string = this.md.render(data.content).split('\n').join('');
          previewMardown = /[^[>]+(?=<)/g.exec(content.split('\n')[0])[0];
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
  getBlogsLength(categoryId?: string): void {
    this.db.collection<Blog>('blogs', ref => {
      let query: firebase.firestore.Query = ref;
      if (categoryId) { query = ref.where('category', '==', categoryId) }
      return query;
    }).valueChanges().subscribe(c => this.length = c.length);
  }

  /** GET blog with name */
  searchBlogs(term: string): Observable<Blog[]> {
    if(!term.trim()) { return of([]); }
    return this.db.collection<Blog>("blogs", ref => 
      ref
        .orderBy("title")
        .startAt(term)
        .endAt(term + "\uf8ff")
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Blog;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

}
