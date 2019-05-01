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
import * as firebase from 'firebase';
import { firestore } from 'firebase/app';
import { Timestamp } from '@firebase/firestore-types';

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
        if (limitNumber !== -1) {
          query = query.limit(limitNumber);
        }
        if (categoryId) {
          query = query.where('category', '==', categoryId);
        }
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map((a, index) => {
            let previewMardown: string;
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            previewMardown = removeMd(data.content.split('\n')[0].split(' ').slice(0, 60).join(' ')) + ' ...';
            let rs = /!\[.*?\]\((.*?)\)/.exec(data.content) || /<img[^>]+src=['"]([^">]+)['"]/igm.exec(data.content);
            const image = rs ? rs[1] : null;
            return { id, ...data, previewMardown, image };
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

  /** GET newer id of curent post */
  getOlderNewerost(date: Timestamp, str: string): Observable<Blog> {
    return this.db
      .collection<Blog>('blogs', ref => {
        let query: firebase.firestore.Query = ref;
        if (str === 'n') {
          query = query
            .orderBy('day', 'asc')
            .where('day', '>', date)
            .limit(1);
        } else {
          query = query
            .orderBy('day', 'desc')
            .where('day', '<', date)
            .limit(1);
        }
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(
          actions =>
            actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })[0]
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

  getPostByTag(tag: string): Observable<Blog[]> {
    return this.db.collection<Blog>('blogs', ref =>
      ref.orderBy('day', 'desc').where('tags', 'array-contains', tag)
    ).snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Blog;
      const id = a.payload.doc.id;
      const previewMardown = removeMd(data.content.split('\n')[0].split(' ').slice(0, 60).join(' ')) + ' ...';
      let rs = /!\[.*?\]\((.*?)\)/.exec(data.content) || /<img[^>]+src=['"]([^">]+)['"]/igm.exec(data.content);
      const image = rs ? rs[1] : null;
      return { id, ...data, previewMardown, image };
    })))
  }
}
