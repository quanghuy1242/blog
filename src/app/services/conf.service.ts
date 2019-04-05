import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Configuration } from '../models/configuration.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConfService {
  conf: Observable<Configuration>;
  constructor(
    private readonly db: AngularFirestore
  ) { }

  getConf(): Observable<Configuration> {
    if (this.conf) {
      return this.conf;
    } else {
      return this.db.doc<Configuration>('conf/eydJw8SpViKxaUe4VEdR').valueChanges();
    }
  }
  
}
