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


/** Error when invalid control is dirty, touched, or submitted. 
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
 */

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule],

})


export class DropdownComponent {

  @Input() list: any;
  @Input() isRequired: boolean = true;
  @Input() parameter!: string;
  @Input() location!: string;
  @Input() fileContent: any;

  componentId: number = 0;

  options: string[] = [];
  dropdown = new FormControl('');
  //selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  constructor(private eventEmitterService: EventEmitterService, private propertyDataService: PropertyDataService){}

  ngOnInit() {
    this.componentId = FormPercentComponent.id++;
    this.options = this.list.Liste;
    this.dropdown.setValue(this.parameter)
    this.dropdown.setValidators([this.selectValidator.bind(this)]);

    // Trigger validation to ensure proper initialization
    this.dropdown.updateValueAndValidity();

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
      if (loc[0] == check) {
        this.dropdown.markAsTouched();
      }
    });
  }

  selectValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const loc = this.location.split('.');

    if (value === '' && !this.isRequired) {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null; // The value is within the range
    }else if (value === '' && this.isRequired) {
      this.eventEmitterService.emitErrorInTextField(this.componentId, loc[0]);
      return { notSelected: true }; // The value is within the range
    } else {
      this.eventEmitterService.emitCorrectInTextField(this.componentId, loc[0]);
      return null; // The value is within the range
    }
  }

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  changeVal(){
    //console.log(this.location)
    const loadin = this.location.split(".");
    const pos = this.list.Liste.indexOf(this.dropdown.value);
    //console.log('Neuer Wert: ', this.list.Translations[pos]);

    /*
    console.log("Parameter:");
    console.log(this.parameter);
    console.log("File Content:");
    console.log(this.fileContent);
    console.log("Location:");
    console.log(this.location); */

    const validDistributions = ["Normal", "Uniform", "Exponential", "Poisson", "Binomial", "Gamma", "Beta", "Weibull"];

  
    if (validDistributions.includes(this.parameter)) {
      this.propertyDataService.setDistribution(this.parameter);
    }
    if (pos >= 0) {
      if (loadin.length == 2) {
        this.fileContent[loadin[0]][loadin[1]] = this.list.Translations[pos];
      } else if (loadin.length == 3) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]] = this.list.Translations[pos];
      } else if (loadin.length == 4) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]] = this.list.Translations[pos];
      } else if (loadin.length == 5) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]] = this.list.Translations[pos];
      } else if (loadin.length == 6) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]] = this.list.Translations[pos];
      } else if (loadin.length == 7) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]] = this.list.Translations[pos];
      } else if (loadin.length == 8) {
        this.fileContent[loadin[0]][loadin[1]][loadin[2]][loadin[3]][loadin[4]][loadin[5]][loadin[6]][loadin[7]] = this.list.Translations[pos];
      }
    }
  }
}