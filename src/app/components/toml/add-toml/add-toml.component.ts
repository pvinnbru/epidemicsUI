import { Component} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTomlDialogComponent } from '../add-toml-dialog/add-toml-dialog.component';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-add-toml',
  templateUrl: './add-toml.component.html',
  styleUrls: ['./add-toml.component.scss']
})

/* 
Component that utilizes the fileService, the AddTomlDialogComponent and a MatDialog to create new .toml Files 
*/

export class AddTomlComponent {

  constructor(private dialog: MatDialog, private fileService: FileService) {}

  // Method that is executed when the addToml Button is pressed
  // A dialogue Window opens that contains a text field for the file name
  // After the name is confirmed, the addBlankTomlFile Method by the FileService is executed.
  public createNewFile() : void {
    const dialogRef: MatDialogRef<AddTomlDialogComponent> = 
    this.dialog.open(AddTomlDialogComponent, {
      width: '70%', // adjust width of dialog window
      height: '80%', // adjust height of dialog window
    });

    //method for 'create' button in dialog window
    dialogRef.afterClosed().subscribe(filename => {
      this.fileService.addBlankTomlFile(filename);
    });
  }

}