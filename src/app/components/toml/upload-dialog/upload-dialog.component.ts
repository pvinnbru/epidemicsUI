import { Component, inject } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from 'src/app/services/current-user.service';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})

export class UploadDialogComponent {
  name: string ='';
  description: string = '';
  uploadMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private dialog: MatDialog,
    private http: HttpClient,
    private currentUserService: CurrentUserService,
  ) {}

  uploadFile() {
    if (!this.name) {
      console.error('Filename is required');
      this.uploadMessage = 'Filename is required';
      return;
    }

    console.log(this.data.fileContent);
    
    this.http.post('http://localhost:3000/files/create', { name: this.name, toml: this.data.fileContent, author: this.currentUserService.getLoggedInUserEmail(), description: this.description })
      .subscribe(
        (response: any) => {
          console.log(response.message);
         
        },
      );
      
      setTimeout(() => {
        this.dialogRef.close();
      }, 500);
    }
}



