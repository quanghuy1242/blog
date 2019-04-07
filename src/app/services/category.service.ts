import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
  	private readonly db: AngularFirestore
  ) { }

  /** GET all category */
  getCategories(): Observable<Category[]> {
    return this.db.collection<Category>('categories', ref => ref.orderBy('name', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    )
  }
}
