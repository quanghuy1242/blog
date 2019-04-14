import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';

import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import removeMd from 'remove-markdown';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from '@angular/fire/firestore';

@Injectable()
export class BlogServiceService {
  blogCollection: AngularFirestoreCollection<Blog>;
  blogDoc: AngularFirestoreDocument<Blog>;
  length = 0;
  currentLimit = 4;

  constructor(private readonly db: AngularFirestore) {}

  /** GET all blogs from server */
  getBlogs(limitNumber: number, categoryId?: string): Observable<Blog[]> {
    return this.db
      .collection<Blog>('blogs', ref => {
        let query = ref.orderBy('day', 'desc');
        if (limitNumber !== -1) { query = query.limit(limitNumber); }
        if (categoryId) { query = query.where('category', '==', categoryId); }
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a, index) => {
            let previewMardown: string;
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            previewMardown = removeMd(data.content.split('\n')[0]);
            return { id, ...data, previewMardown };
          })
        )
      );
  }

  /** GET blog by id */
  getBlog(id: string): Observable<Blog> {
    return this.db
      .doc<Blog>('blogs/' + id)
      .snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...data };
        })
      );
  }

  /** GET previous and next id of curent post */
  getPrevNextPost(id: string): Observable<{ prev: string; curr: string; next: string }> {
    return this.db
      .collection<Blog>('blogs', ref => ref.orderBy('day', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions
            .map((a, index) => {
              const curr = a.payload.doc.id;
              if (id === curr) {
                const prev = actions[index + 1] ? actions[index + 1].payload.doc.id : null;
                const next = actions[index - 1] ? actions[index - 1].payload.doc.id : null;
                return { prev, curr, next };
              }
            })
            .find(value => value.curr === id)
        )
      );
  }

  /** GET length of collection */
  getBlogsLength(categoryId?: string): void {
    this.db
      .collection<Blog>('blogs', ref => {
        let query: firebase.firestore.Query = ref;
        if (categoryId) {
          query = ref.where('category', '==', categoryId);
        }
        return query;
      })
      .valueChanges()
      .subscribe(c => (this.length = c.length));
  }

  /** GET blog with name */
  searchBlogs(term: string): Observable<Blog[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.db
      .collection<Blog>('blogs', ref =>
        ref
          .orderBy('title')
          .startAt(term)
          .endAt(term + '\uf8ff')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
