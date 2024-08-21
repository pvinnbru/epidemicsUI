import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormPercentComponent } from '../form-percent/form-percent.component';
import { PropertyDataService } from 'src/app/services/property-data.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
@Component({
  selector: 'app-multi-dropdown',
  templateUrl: './multi-dropdown.component.html',
  styleUrls: ['./multi-dropdown.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule],

})
export class MultiDropdownComponent {

  @Input() list: any;
  @Input() isRequired: boolean = true;
  @Input() parameter!: string[];
  @Input() location!: string;
  @Input() fileContent: any;

  componentId: number = 0;

  options: string[] = [];
  dropdown = new FormControl<string[]>([]);

  constructor(
    private eventEmitterService: EventEmitterService,
    private propertyDataService: PropertyDataService
  ) {}

  ngOnInit() {
    console.log("parametr"   + this.parameter)
    this.componentId = FormPercentComponent.id++;
    this.options = this.list.Liste;
    
    this.dropdown.setValidators([this.selectValidator.bind(this)]);

    // Trigger validation to ensure proper initialization
    this.dropdown.updateValueAndValidity();

    this.eventEmitterService.tabAlreadySeenEvent.subscribe((data: any) => {
      const loc = this.location.split('.');
      let check;
      if (data == 1) {
        check = 'Simulation';
      } else if (data == 2) {
        check = 'Pathogens';
      } else if (data == 3) {
        check = 'Settings';
      } else if (data == 4) {
        check = 'Vaccines';
      } else if (data == 5){
        check = 'Interventions';
      }else{
        check ='none';
      }

      // Check the condition and markAsTouched if true
      if (loc[0] == check) {
        this.dropdown.markAsTouched();
      }
    });
    this.dropdown.setValue(["Test"]);
    
  }

  selectValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const loc = this.location.split('.');

    if (Array.isArray(value) && value.length === 0 && !this.isRequired) {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null;
    } else if (Array.isArray(value) && value.length === 0 && this.isRequired) {
      this.eventEmitterService.emitErrorInTextField(this.componentId, loc[0]);
      return { notSelected: true };
    } else {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null;
    }
  }

  changeVal() {
    const loadin = this.location.split('.');
    const selectedValues = this.dropdown.value;

      if (loadin.length == 2) {
        this.fileContent[loadin[0]][loadin[1]] = selectedValues;
      } else if (loadin.length == 3) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]] = selectedValues;
      } else if (loadin.length == 4) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]] = selectedValues;
      } else if (loadin.length == 5) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]] = selectedValues;
      } else if (loadin.length == 6) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]] = selectedValues;
      } else if (loadin.length == 7) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]] = selectedValues;
      } else if (loadin.length == 8) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]][loadin[7]] = selectedValues;
    }
  }
}
