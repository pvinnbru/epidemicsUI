import { Component } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  constructor(private dialog: MatDialog) {}
  
  openDialog() {
    console.log('LogIn dialog opend');
    const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(LoginDialogComponent, {
      width: '800px', // adjust width of dialog window
      height: '400px' // adjust height of the dialog window
    });
}
}
