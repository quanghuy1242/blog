import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  hide: boolean = true;
  loginActive: boolean = false;

  @ViewChild("btn") btnS: ElementRef;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  getEmailError(): string {
    return this.email.hasError('required') ? 'You must enter a value for email' : this.email.hasError('email') ? 'Your input email is not valid' : '';
  }

  getPassError(): string {
    return this.password.hasError('required') ? 'You must enter a value for password' : '';
  }

  disableForm(): void {
    this.email.disable();
    this.password.disable();
  }

  enableForm(): void {
    this.email.enable();
    this.password.enable();
  }

  async login() {
    this.loginActive = true;
    this.disableForm();
    if (this.getEmailError() === "" && this.getPassError() === "") {
      try {
        await this.authService.login(this.email.value, this.password.value);
        this.router.navigate(['/home']);
      } catch (error) {
        this.dialog.open(DialogInfoComponent, {
          width: '300px',
          data: { title: 'Error', content: error }
        });
        this.loginActive = false;
        this.enableForm();
      }
    }
  }
}