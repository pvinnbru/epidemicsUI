import { Component, Input } from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent {


  @Input() fileContent: any;
  @Input() parameter: any;
  @Input() location: string = '';
  @Input() isRequired: boolean = true;

  distri = {
    Label: "Distribution",
    Liste: ["Normal", "Uniform","Exponential","Poisson","Binomial", "Gamma", "Beta", "Weibull"],
    Translations: ["Normal", "Uniform","Exponential","Poisson","Binomial", "Gamma", "Beta", "Weibull"]
  }

  constructor(private propertyDataService : PropertyDataService) {}

  distributionParameterChange() {
    this.propertyDataService.setDistributionParameter(this.parameter.parameters);
  }

}
