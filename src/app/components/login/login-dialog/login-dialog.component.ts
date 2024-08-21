import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})


export class LoginDialogComponent {

  email: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog,
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    private fileService: FileService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createNewAccount(): void {
    const dialogRef: MatDialogRef<SignUpDialogComponent> = this.dialog.open(SignUpDialogComponent, {
      width: '800px', // adjust width of dialog window
      height: '500px' // adjust height of the dialog window
    });
  }

  login(): void {
    if (!this.email || !this.password) {
      console.error('Email and password are required.');
      this.loginMessage = 'Email and password are required.';
      return;
    }

    // Make a request to the login API endpoint
    this.http.post('http://localhost:3000/users/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          console.log(response);

          // Set the logged-in user email using the CurrentUserService
          this.currentUserService.setLoggedInUserEmail(response.user.email);

          this.loginMessage = 'Login successful';
          this.fileService.refreshFilesFromDatabase();
          // Close the dialog after 1 second
          setTimeout(() => {
            this.dialogRef.close();
          }, 500);
        },
        (error: any) => {
          console.error(error);
          this.loginMessage = 'Email or password mismatch';
          // You can handle login failure here, e.g., show an error message
        }
      );

      
  }
}