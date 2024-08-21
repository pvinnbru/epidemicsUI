import { Injectable } from '@angular/core';
import { Component , Input} from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-general-parameters',
  templateUrl: './general-parameters.component.html',
  styleUrls: ['./general-parameters.component.scss']
})
export class GeneralParametersComponent {

  @Input() fileContent: any;
  unit = {
    Label: "Unit",
    Liste: ["seconds", "minutes", "hours", "days","weeks"],
    Translations: ["s", "m", "h", "d", "w"]
    }
  
  constructor(private propertyDataService : PropertyDataService) {}


  getTickunit(value: string): string {
    switch (value) {
      case 'w':
        return "weeks"
      case 'd':
        return "days"
      case 'h':
        return "hours"
      case 'm':
        return "minutes"
      case 's':
        return "seconds"
      default:
        return ""
    }
  }


     
  setProperty(property : string): void {
    this.propertyDataService.setProperty(property);
  }
}