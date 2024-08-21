import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//is needed to get the Info in some components that the viewed file was changed
export class EventEmitterService {

  /*
    buttonTomlChangeEvent: The age-matrix requires information about whether the TOML file was changed to trigger a reload 
                           of certain values.
    
    errorInTextFieldEvent: Adding IDs of reusable components to a list if a form was not properly filled out.
    correctInTextFieldEvent: Removing IDs of reusable components from a list if a form was properly filled out.
    
    pathogeneNameChangeEvent: Informing components that the pathogen name was changed.
    emitTabChangedEvent: To load the distribution graphs properly and track all opened tabs, used by tabAlreadySeenEvent.
    tabAlreadySeenEvent: Marking all fields that are not yet filled in red after visiting the tab for the second time to make 
                         it easier to find the missing fields.
    
    errors: A list of all the improperly filled fields.
    tabsSeen: Tracking all the tabs that have been opened.
    lastTab: Tracking the last opened tab.
  */
  public buttonTomlChangeEvent: EventEmitter<void> = new EventEmitter<void>();

  public errorInTextFieldEvent: EventEmitter<Number> = new EventEmitter<Number>();
  public correctInTextFieldEvent: EventEmitter<Number> = new EventEmitter<Number>();

  public pathogeneNameChangeEvent: EventEmitter<String> = new EventEmitter<String>();
  public emitTabChangedEvent: EventEmitter<Number> = new EventEmitter<Number>();
  public tabAlreadySeenEvent: EventEmitter<Number> = new EventEmitter<Number>();
  errors: number[][] = [[], [], [], [], [], []];
  tabsSeen: boolean[] = [true, false, false, false, false];
  lastTab: number = 0;

  emitTomlChange(): void {
    this.buttonTomlChangeEvent.emit();
    this.tabsSeen = [false, false, false, false, false];
    this.tabsSeen[this.lastTab] = true;
  }

  emitErrorInTextField(id: number, usage: String): void {
    const index = this.getIndex(usage);
    if (this.errors[index].indexOf(id) === -1) {
      this.errors[index].push(id);
      //console.log(`Hinzugefügt id: ${id} aus ${usage}`);
      //console.log(this.errors);
      //console.log(index)
      this.errorInTextFieldEvent.emit(index);
    }
  }

  emitCorrectInTextField(id: number, usage: String): void {
    const index = this.getIndex(usage);
    if (this.errors[index].indexOf(id) != -1) {
      this.errors[index].splice(this.errors[index].indexOf(id), 1);
      //console.log("Entfernt id: " + id)
      //console.log(this.errors[index])
      if (this.errors[index].length == 0) {
        this.correctInTextFieldEvent.emit(index);
      }
    }
  }

  getIndex(usage: String) {

    if (usage == "Simulation") {
      return 1;
    } else if (usage == "Pathogens") {
      return 2
    } else if (usage == "Settings") {
      return 3
    } else if (usage == "Vaccines") {
      return 4
    } else if (usage == "Interventions") {
      return 5
    } else {
      return 0;
    }
  }

  emitTabChanged(tab: number): void {

    this.emitTabChangedEvent.emit(tab);

    this.lastTab = tab;
    if (this.tabsSeen[tab] == true) {
      this.tabAlreadySeenEvent.emit(tab);
    } else {
      this.tabsSeen[tab] = true; // Set the selected one to true
    }
  }


  emitPathogeneNameChange(name: String): void {
    this.pathogeneNameChangeEvent.emit(name)
  }
}