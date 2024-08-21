import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  userExists: boolean = false;

  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>, private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSignUpClick(): void {
    this.passwordMismatch = false;
    this.userExists = false;

    if (!this.email || !this.password || !this.confirmPassword) {
      console.error('Email, password, and confirmation are required.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.http.post('http://localhost:3000/users/create', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          console.log(response.message);
          this.dialogRef.close();
        },
        (error: any) => {
          if (error.error && error.error.error === 'User already exists') {
            this.userExists = true;
          } else {
            console.error('Failed to create user:', error);
          }
        }
      );
  }
}