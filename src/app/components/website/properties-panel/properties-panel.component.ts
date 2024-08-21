import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})

/*
This class determines the content of the property panel. It uses the propertyDataService
*/
export class PropertiesPanelComponent {

  // validDistributionProperties : string[] 
  // Attribute which contains valid Property Values for the distribution property 
  validDistributionProperties: string[] = ['Infection Rate', 'Time to recovery', 'Mild death rate', 'Critical death rate'];

  // This class needs the propertyDataService to know the last property the user clicked on. This determines the content of the property window. 
  constructor(private propertyDataService : PropertyDataService) {}

  /*
  The following three methods all return the corresponding getter-methods of the associated propertyDataService
  */
  public getProperty() : Observable<string> {
    return this.propertyDataService.getProperty();
  } 

  public getDistribution() : Observable<string> {
    return this.propertyDataService.getDistribution();
  }

  public getDistributionParameters() : Observable<number[]> {
    return this.propertyDataService.getDistributionParameters();
  }
}
