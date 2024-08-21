import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteTomlDialogComponent } from '../delete-toml-dialog/delete-toml-dialog.component';

@Component({
  selector: 'app-delete-toml',
  templateUrl: './delete-toml.component.html',
  styleUrls: ['./delete-toml.component.scss']
})

/* This component utilizes the MatDialog and the DeleteTomlDialogComponent as a subsidiary component to start a delete Dialog.
*/
export class DeleteTomlComponent {

  // This is the file that the user wants to delete
  @Input() file!: any;

  constructor(private dialog: MatDialog) {}

  // This method starts the Dialog to delete a .toml File
  startDeleteDialog(): void {
    const dialogRef: MatDialogRef<DeleteTomlDialogComponent> = this.dialog.open(DeleteTomlDialogComponent, {
    data: { file: this.file },
    
    });

    
  }

}
