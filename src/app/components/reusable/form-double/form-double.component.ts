import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FormPercentComponent } from '../form-percent/form-percent.component';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-form-double',
  templateUrl: './form-double.component.html',
  styleUrls: ['./form-double.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule,],
})
export class FormDoubleComponent {

  @Input() isRequired: boolean = true;
  @Input() parameter!: number;
  @Input() fileContent: any;
  @Input() location!: string;
  @Input() isReadonly = false;
  numberInRange = new FormControl('');
  value: number = 0;
  @Input() min: number = Number.NEGATIVE_INFINITY;
  @Input() max: number = Number.POSITIVE_INFINITY;

  componentId: number = 0;

  constructor(private eventEmitterService: EventEmitterService){}

  ngOnInit() {

    this.componentId = FormPercentComponent.id++;

    // Set the validators after the component has been initialized
    this.numberInRange.setValidators([this.numberRangeValidator.bind(this)]);

    // Trigger validation to ensure proper initialization
    this.numberInRange.updateValueAndValidity();
    this.value = this.parameter !== undefined ? this.parameter : 0;

    this.eventEmitterService.tabAlreadySeenEvent.subscribe((data: any) => {
      const loc = this.location.split('.');
      let check;
      if(data == 1){
        check = "Simulation"
      }else if(data == 2){
        check = "Pathogens"
      }else if(data == 3){
        check = "Settings"
      }else if(data == 4){
        check = "Vaccines"
      }else if (data == 5){
        check = 'Interventions';
      }else{
        check ='none';
      }

      // Check the condition and markAsTouched if true
      if (loc[0] === check) {
        this.numberInRange.markAsTouched();
      }
    });

  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control === this.numberInRange && control.hasError('numberRange')) {
      if (this.min == 0 && this.max == Number.POSITIVE_INFINITY) {
        return 'Enter an integer >= 0';
      } else if (this.min == 0 && this.max != Number.POSITIVE_INFINITY) {
        return 'Integer betweenn 0 and ' + this.max;
      } else if (this.min != 0 && this.max == Number.POSITIVE_INFINITY) {
        return 'Enter an integer >= ' + this.min;
      } else {
        return 'Enter an integer between:' + this.min + "-" + this.max;
      }

    }

    return '';
  }

  numberRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    this.value = value;
    const loc = this.location.split('.');

    if (value === '' && !this.isRequired) {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null; // The value is within the range
    } else if (value === '' || isNaN(value) || !(this.min <= value && value <= this.max)) {
      this.eventEmitterService.emitErrorInTextField(this.componentId, loc[0]);
      return { numberRange: true };
    } else {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null; // The value is within the range
    }

  }

  ngOnDestroy() {
    //So that in the bar on the top there are no false errors
    const loc = this.location.split('.');
    this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
  }

  changeVal(event: Event) {
    const loadin = this.location.split(".");

    /*
    console.log("Parameter:");
    console.log(this.parameter);
    console.log("File Content:");
    console.log(this.fileContent);
    console.log("Location:");
    console.log(this.location); */

    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim(); // Trim to remove leading/trailing whitespaces

    // Try to parse the input value as a float
    const parsedValue = parseFloat(inputValue);

    // Check if the parsed value is a valid number
    const isNumber = !isNaN(parsedValue);

    // Use the parsed value if it's a valid number, otherwise, use the original value
    const neu = isNumber ? parsedValue : inputValue;

    if (loadin.length == 2) {
      this.fileContent[loadin[0]][loadin[1]] = neu;
    } else if (loadin.length == 3) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]] = neu;
    } else if (loadin.length == 4) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]] = neu;
    } else if (loadin.length == 5) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]] = neu;
    } else if (loadin.length == 6) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]] = neu;
    } else if (loadin.length == 7) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]] = neu;
    } else if (loadin.length == 8) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]][loadin[7]] = neu;
    }
  }
}
