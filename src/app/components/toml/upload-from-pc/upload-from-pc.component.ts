import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { resolve } from 'mathjs';
import { parse } from 'toml';

@Component({
  selector: 'app-upload-from-pc',
  templateUrl: './upload-from-pc.component.html',
  styleUrls: ['./upload-from-pc.component.scss']
})
export class UploadFromPcComponent {

  constructor(private fileService: FileService) {}

openUploadDialog() {
  const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files?.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          let fileContent = reader.result as string;
          let parsedToml;
          try {
            parsedToml = parse(fileContent); // Assign the parsed value to 'parsedToml'
          } catch (parseErr) {
            alert("This seems to be no toml file. Please make sure your file is using the right format.");
            return;
          }

          this.fileService.uploadFileToServer(file.name, parsedToml);
          
        };
        reader.readAsText(file);
      }
    };
}

}
