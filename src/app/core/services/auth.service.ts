import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

  createNewUser(user: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user, password);
  }

  UserInfo(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
