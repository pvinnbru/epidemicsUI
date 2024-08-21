import { OnChanges, Component, Input } from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent{
  @Input() fileContent: any;

  hero2 = {
    Label: "waning",
    Liste: ["DiscreteWaning"],
    Translations: ["DiscreteWaning"]
  }

  hero1 = {
    Label: "Type",
    Liste: ["Daily Dose Strategy"],
    Translations: ["DailyDoseStrategy"]
  }

  constructor(private propertyDataService : PropertyDataService) {}

  // set Property for Property Window
  setProperty(property : string) {
    this.propertyDataService.setProperty(property);
  }

  getStrategyType(value: string): string {
    switch (value) {
      case 'DailyDoseStrategy':
        return "Daily Dose Strategy"
      default:
        return ""
    }
  }

  getWaningType(value: string): string {
    switch (value) {
      case 'DiscreteWaning':
        return "DiscreteWaning"
      default:
        return ""
    }
    }
  }

