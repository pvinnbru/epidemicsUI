import { Component, ViewChildren, QueryList, Input, SimpleChanges } from '@angular/core';
import { FormTextComponent } from 'src/app/components/reusable/form-text/form-text.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-age-matrix',
  templateUrl: './age-matrix.component.html',
  styleUrls: ['./age-matrix.component.scss']
})

//adding the agr group verification to the age matrix
export class AgeMatrixComponent {

  /*
  listLength: Number of existing age groups.
  ageGroupsIndex: Array of numbers based on the count of age groups for the HTML side.
  ageGroups: Array containing all age groups.
  ageOkay: Indicates whether the age groups are in the right format.
  matrix: Saves all the values from all age groups.
  validationMessageAge: Message displayed after clicking the "Finish editing age groups" button.
  pathogen: Saves the name of the pathogen in the file.
  tomlChanged: Used to reload some variables if the TOML file has changed.
  currentValue: Stores the last values that were changed.
  */

  @Input() fileContent: any;
  listLength: any;
  ageGroupsIndex: any[] = [];
  ageGroups: string[] = [];
  @Input() ageOkay: boolean = false;
  matrix!: number[][];
  validationMessageAge: string = 'Validation not performed';
  pathogen!: string;
  tomlChanged = false;
  currentValue: number[] = [];

  constructor(private eventEmitterService: EventEmitterService, private propertyDataService: PropertyDataService) { }

  //saving the values if they were changed by the slider
  onSliderValueChanged(values: number[], index: number) {
    this.currentValue = values;
    this.matrix[index] = this.currentValue
    this.fileContent['Pathogens'][this.pathogen]['dpr']['age_groups'] = this.ageGroups;
    this.fileContent['Pathogens'][this.pathogen]['dpr']['stratification_matrix'][index] = this.matrix[index];
  }

  // Method to initialize the matrix to load the already saved stratification matrix
  ngOnInit() {
    this.pathogen = this.fileContent['Simulation']['StartCondition']['pathogen'];

    //Needed to set ageOkay to false if the viewed file was changed
    this.eventEmitterService.buttonTomlChangeEvent.subscribe(() => {
      this.tomlChanged = true;
      this.setAgeOkay();
    });

    this.eventEmitterService.emitErrorInTextField(-1, "Pathogens");
  }

  // Method to generate an array of numbers based on the count of age groups for the html side
  generateNumbers(count: number) {
    let generatedNumbers: number[] = [];
    this.ageGroupsIndex = Array.from({ length: 100 }, (_, index) => ({ propertyName: `Object ${index + 1}` }));

    // Ensure list length does not exceed 100
    this.listLength = Math.min(count, 100);

    generatedNumbers = Array(this.listLength).fill(0).map((_, i) => i + 1);

    return generatedNumbers;
  }

  // Method to check if a string is numeric
  isNumeric(str: string): boolean {
    return /^\d+$/.test(str);
  }

  // Method to add an age group to the list
  addAgeGroup(i: number, str: string) {
    this.ageGroups[i] = str;
    this.ageGroups = this.ageGroups.slice(0, this.listLength);
  }

  // Method to validate the age groups
  editAgeGroups(ageGroups: string[]): boolean {
    let previousEnd = -1;

    this.generateNumbers(ageGroups.length);
    this.matrix = Array.from({ length: this.listLength + 1 }, () => Array(4).fill(0));


    console.log(ageGroups)
    if (this.tomlChanged) {
      this.ageGroups = [];
      this.tomlChanged = false;
    }
    if (this.ageGroups.length == 0) {
      this.validationMessageAge = `You need at least 1 age group`;
      this.ageOkay = false;
      return false;
    }


    for (let i = 0; i < ageGroups.length; i++) {
      const [start, end] = this.parseRange(ageGroups[i]);

      if (start === null || end === null) {
        this.validationMessageAge = `Invalid range format: ${ageGroups[i]}`;
        this.ageOkay = false;
        return false;
      }

      if (start === -1 || end === -1) {
        this.validationMessageAge = `Using doubles is forbidden: ${ageGroups[i]}`;
        this.ageOkay = false;
        return false;
      }

      if (start <= previousEnd || (start === 0 && previousEnd === 0)) {
        this.validationMessageAge = `Invalid order or overlap: ${ageGroups[i]}`;
        this.ageOkay = false;
        return false;
      }

      if (start !== previousEnd + 1) {
        if (i === 0) {
          this.validationMessageAge = `Age groups have to start at 0`;
        } else {
          this.validationMessageAge = `Gap between ranges: ${ageGroups[i - 1]} and ${ageGroups[i]}`;
        }
        this.ageOkay = false;
        return false;
      }

      if (ageGroups.length - 1 == i) {
        if (!ageGroups[i].endsWith('+') || start !== end) {
          this.validationMessageAge = `The last age groups format should be "age+": ${ageGroups[i]}`;
          this.ageOkay = false;
          return false;
        }
      }

      previousEnd = end;
    }

    this.ageOkay = true;
    this.validationMessageAge = 'Validation succeeded';

    this.eventEmitterService.emitCorrectInTextField(-1, "Pathogens");
    return true;
  }

  //Method to get the age ranges and checking if they are in the right format to work with them further
  //with the returns editAgeGroups() can know what error message should be send
  parseRange(range: string): [number | null, number | null] {
    const parts = range.split('-');



    if (parts.length === 1) {
      const num = parseInt(parts[0]);
      if (isNaN(num)) {
        return [null, null];
      }
      return [num, num];
    } else if (parts.length === 2) {
      //checking if it is a Iniger or double
      if (Number.isInteger(Number(parts[0])) && Number.isInteger(Number(parts[1]))) {
        const start = parseInt(parts[0]);
        const end = parseInt(parts[1]) - 1;
        if (isNaN(start) || isNaN(end) || start > end) {
          return [null, null];
        }
        //is an int
        return [start, end];
      } else {
        //sending the information that it is a double
        return [-1, -1];
      }
    } else {
      const start = parseInt(parts[0]);
      if (isNaN(start)) {
        return [null, null];
      }
      return [start, null];
    }
  }


  // Method to reset age validation
  setAgeOkay() {
    this.validationMessageAge = 'Validation not performed';
    this.eventEmitterService.emitErrorInTextField(-1, "Pathogens");
    this.ageOkay = false;
  }

  // Function to Update Property Window
  setProperty(property: string): void {
    this.propertyDataService.setProperty(property);
  }

}