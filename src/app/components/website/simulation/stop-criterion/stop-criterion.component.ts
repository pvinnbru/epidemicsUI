import { Component, Input} from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-stop-criterion',
  templateUrl: './stop-criterion.component.html',
  styleUrls: ['./stop-criterion.component.scss']
})
export class StopCriterionComponent {

  @Input() fileContent: any;
  
  type = {
    Label: "Stop type",
    Liste: ["Time is Up"],
    Translations: ["TimesUp"]
  }

  constructor(private propertyDataService : PropertyDataService) {}

  getStoptype(value: string): string {
    switch (value) {
      case 'TimesUp':
        return "Time is Up"
        break;
      default:
        return ''
    }
  }
  
  setProperty(property : string): void {
    this.propertyDataService.setProperty(property);
  }

}
