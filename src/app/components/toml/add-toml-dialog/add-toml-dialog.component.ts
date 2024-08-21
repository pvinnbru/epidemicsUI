import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-toml-dialog',
  templateUrl: './add-toml-dialog.component.html',
  styleUrls: ['./add-toml-dialog.component.scss']
})

// This subsidiary component gets created within the createNewFile() method of the addTomlComponent. It includes the content of the MatDialog, which is displayed when the user adds a new toml file.
// includes method that continue or abort the creation of a new toml file  
export class AddTomlDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddTomlDialogComponent>) {}

  //function gets executed, when 'cancel' is pressed. Exits dialog window without saving changes
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Triggered when Enter key / Create is pressed
  // The filename is further processed
  createNewConfiguration(filename : String): void {
    this.dialogRef.close(filename);
  }
}
