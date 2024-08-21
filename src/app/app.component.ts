import { Component, Injectable, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Renderer2, ElementRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { PropertyDataService } from 'src/app/services/property-data.service';

import { Observable } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadDialogComponent } from './components/toml/upload-dialog/upload-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  overlayRef: OverlayRef | null = null;
  fileContent: any;
  selectedTOML: boolean = false;
  selectedFilename: string = '';
  showFilenameInput: boolean = false; // Flag to control visibility of filename-Input (for creation of new toml)
  
  tabs = [
    { label: 'Simulation', isSelected: true, isFinishedfalse: true },
    { label: 'Pathogens', isSelected: false },
    { label: 'Settings', isSelected: false },
    { label: 'Vaccines', isSelected: false },
    { label: 'Interventions', isSelected: false }
  ];

  activeTab = 'Simulation'
  checkSimulation = true;
  checkPathogens = true;
  checkSettings = true;
  checkVaccines = true;
  checkInterventions = true;
  selectedParameter: any;
  propertiesFieldName: string = "";
  propertiesText: string = "Bitte Input-Feld auswählen!"
  selectedFileID: any;

  constructor(
    private fileService: FileService, 
    private renderer: Renderer2, 
    private el: ElementRef, 
    private eventEmitterService: EventEmitterService,
    private dialog: MatDialog, 
    private propertyDataService : PropertyDataService) { }
    
    reloadPathogene : boolean = true;

  ngOnInit() {
    this.createDiv();

    this.eventEmitterService.errorInTextFieldEvent.subscribe((emittedIndex: number) => {
      if (emittedIndex == 1) {
        this.checkSimulation = false;
      } else if (emittedIndex == 2) {
        this.checkPathogens = false;
      } else if (emittedIndex == 3) {
        this.checkSettings = false;
      } else if (emittedIndex == 4) {
        this.checkVaccines = false;
      }else if (emittedIndex == 5) {
        this.checkInterventions = false;
      }
    });

    this.eventEmitterService.correctInTextFieldEvent.subscribe((emittedIndex: number) => {
      if (emittedIndex == 1) {
        this.checkSimulation = true;
      } else if (emittedIndex == 2) {
        this.checkPathogens = true;
      } else if (emittedIndex == 3) {
        this.checkSettings = true;
      } else if (emittedIndex == 4) {
        this.checkVaccines = true;
      }else if (emittedIndex == 5) {
        this.checkInterventions = true;
      }
    });

    this.eventEmitterService.pathogeneNameChangeEvent.subscribe((name: string) => {

      this.reloadPathogene = false;
      setTimeout(() => {
        this.reloadPathogene = true;
      }, 1);
    });

  }


  public setActiveTab(value : string) {
    this.propertyDataService.setProperty(value);
    this.activeTab = value;
  }

  //calls the fileService to get the files from the database
  public getFilesFromDatabase() : any {
    return this.fileService.getFilesFromDatabase();
  }

  
  /*sets attributes fileContent, selectedTOML, selectedFilename and selectedFileID
  based on a given file - called on clicking a file from the workspace*/
  showFileContentDatabase(file: any) {
    this.fileService.updateFile(this.selectedFileID, this.fileContent);

    this.fileContent = file.toml;
    this.selectedTOML = true;
    this.selectedFilename = file.name;
    this.selectedFileID = file._id;

    //is needed to get the information in some components that the vieved file was changed
    this.eventEmitterService.emitTomlChange();

    this.reloadPathogene = false;
    setTimeout(() => {
      this.reloadPathogene = true;
    }, 1);

  }

  removeTabIndicator() {
    setTimeout(() => {
      document.querySelectorAll('.mdc-tab-indicator').forEach(el => el.remove());
    }, 500)
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  selectTab(index: number): void {
    this.tabs.forEach(tab => tab.isSelected = false);
    this.tabs[index].isSelected = true;
  }


  // ???
  createDiv() {
    const div = this.renderer.createElement('div');
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  // Method to download the selected .toml file
  downloadFile() {
    this.fileService.updateFile(this.selectedFileID, this.fileContent);
    

    const currDate = new Date();
    const formatDate = currDate.toISOString().slice(0, 19).replace(/:/g, '-');
    console.log(this.fileContent);
    try {
    
    this.fileService.convertFile(this.fileContent).subscribe({
      next: (tomlData) => {
        const dataStr = "data:text/json;charset=utf-8," + tomlData;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);

        let filename = formatDate + "_" + this.selectedFilename;
        if (!filename.endsWith('.toml')) {
          filename += '.toml';
        }

        downloadAnchorNode.setAttribute("download", filename);
        document.body.appendChild(downloadAnchorNode); // erforderlich für Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
    });}
    catch (error) {
      console.log(error);
    }
  }


  // Method to add a new .toml file to the template-database
  openUploadDialog() {
    if(this.selectedTOML == true) {
      this.fileService.updateFile(this.selectedFileID, this.fileContent);
    }
    console.log('Upload dialog opend');
    const dialogRef: MatDialogRef<UploadDialogComponent> = this.dialog.open(UploadDialogComponent, {
      width: '50%',
      height: '45%',
      data: { fileContent: this.fileContent }
    });
  }

  // updating the fileContent in the database on every tab change
  onTabChange(event: any): void {
    const selectedTabIndex = event.index;
    this.eventEmitterService.emitTabChanged(selectedTabIndex);
    this.fileService.updateFile(this.selectedFileID, this.fileContent);
  }


}

