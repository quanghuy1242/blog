import { Injectable } from '@angular/core';
import { Repo } from '../models/repo.model';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private githubAPI = 'https://api.github.com/users/quanghuy1242'

  constructor(
    private http: HttpClient
  ) { }

  /** GET all repo from quanghuy1242 */
  getRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.githubAPI}/repos`).pipe(
      tap(_ => console.log('fetched repos')),
      catchError(this.handleError('getRepos', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
