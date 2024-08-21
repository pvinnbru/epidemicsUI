import { Component, Input, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FormPercentComponent } from '../form-percent/form-percent.component';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class FormTextComponent implements OnInit{
  @Input() isRequired = true;
  @Input() parameter!: string;
  @Input() isReadonly = false;
  @Input() fileContent: any;
  @Input() location: string ="test.test";

  numberInRange = new FormControl('');

  value: string = '';

  componentId: number = 0;
  constructor(private eventEmitterService: EventEmitterService){}
  

  ngOnInit(): void {
    this.componentId = FormPercentComponent.id++;

    this.numberInRange.setValidators([this.numberRangeValidator.bind(this)]);
    this.numberInRange.updateValueAndValidity();
    this.value = this.parameter !== undefined ? this.parameter : '';
    
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

  numberRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    this.value = value;

    const loc = this.location.split('.');

    if(value != null){
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
    return null;
    }else{
      this.eventEmitterService.emitErrorInTextField(this.componentId, loc[0]);
      return { numberRange: true };
    }
  }
  ngOnDestroy() {
    //So that in the bar on the top there are no false errors
    const loc = this.location.split('.');
    this.value = ""
    this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
  }

  
  onBlur() {
      /**
   * This function is triggered when the input field loses focus.
   * If the location of the input field is "Simulation.StartCondition.pathogen",
   * it renames the first key of the Pathogens object to the current value of the input field.
   */
    if(this.location == "Simulation.StartCondition.pathogen"){
      const firstKey = Object.keys(this.fileContent.Pathogens)[0];
      this.fileContent.Pathogens[this.value] = this.fileContent.Pathogens[firstKey];
      delete this.fileContent.Pathogens[firstKey];
      this.eventEmitterService.emitPathogeneNameChange(this.value);
      console.log(this.fileContent)
    }
  }

  changeVal(event: Event)
  {
    const loadin = this.location.split(".");
    const inputElement = event.target as HTMLInputElement;
    console.log('Neuer Wert:', inputElement.value);
    const neu = inputElement.value;
    if (loadin.length == 2) {
      this.fileContent[loadin[0]][loadin[1]] = neu;
    } else if (loadin.length == 3) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]] = neu;
    } else if (loadin.length == 4) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]] = neu;
    } else if (loadin.length == 5) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]] = neu;
    }else if (loadin.length == 6) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]]  = neu;
    }else if (loadin.length == 7) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]]  = neu;
    }else if (loadin.length == 8) {
      this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]][loadin[7]]    = neu;
    }
  }
}