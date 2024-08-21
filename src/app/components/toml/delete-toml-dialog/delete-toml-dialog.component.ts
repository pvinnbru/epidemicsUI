import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-delete-toml-dialog',
  templateUrl: './delete-toml-dialog.component.html',
  styleUrls: ['./delete-toml-dialog.component.scss']
})

/* This component utlizes the FileService to delete the passed file */
export class DeleteTomlDialogComponent {

  // The constructor includes the file that was passed from deleteToml
  constructor(@Inject(MAT_DIALOG_DATA) public data: { file:any },
  private dialogRef: MatDialogRef<DeleteTomlDialogComponent>, 
        private fileService: FileService) {}

  // delete the file by referencing the corresponding fileService method
  deleteFile(file: any): void {
      this.fileService.deleteFileFromDatabase(file._id);

      setTimeout(() => {
        this.dialogRef.close();
      }, 500);
  }
  }

