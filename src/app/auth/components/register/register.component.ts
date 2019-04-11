import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogInfoComponent } from '../../../shared/components/dialog-info/dialog-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])).{6,}/m;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(this.regex)]);
  hide: boolean = true;
  registerActive: boolean = false;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Register');

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  getEmailError(): string {
    return this.email.hasError('required') ? 'You must enter a value for email' : this.email.hasError('email') ? 'Your input email is not valid' : '';
  }

  getPassError(): string {
    return this.password.hasError('required') ? 'You must enter a value for password' : this.password.hasError('pattern') ? 'At least 6 characters, at least one lowercase, uppercase, numbers' : '';
  }

  disableForm(): void {
    this.registerActive = true;
    this.email.disable();
    this.password.disable();
  }

  enableForm(): void {
    this.registerActive = false;
    this.email.enable();
    this.password.enable();
  }

  checkPasswordStregth(password: string): boolean {
    return this.regex.test(password);
  }

  async register() {
    this.disableForm();
    try {
      await this.authService.createNewUser(this.email.value, this.password.value);
      this.router.navigate(['/home']);
    } catch (error) {
      this.dialog.open(DialogInfoComponent, {
        width: '300px',
        data: { title: 'Error', content: error }
      });
      this.enableForm();
    }
  }
}
