import { Component, ViewChildren, QueryList, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormTextComponent } from 'src/app/components/reusable/form-text/form-text.component';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @Input() fileContent: any;
  jsonString: string = '';

  constructor(private propertyDataService : PropertyDataService) {}

  // Set Property for Property Window
  setProperty(property : string) {
    this.propertyDataService.setProperty(property);
  }

  addWorkplace(){
    this.fileContent['Settings']['Workplace'] = { "contactparameter": 0};
  }
  addHousehold(){
    this.fileContent['Settings']['Household'] = { "contactparameter": 0};
  }
}