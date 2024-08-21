import { Component, Input} from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';
import { PlotDistributionsComponent } from 'src/app/components/reusable/distribution/plot-distributions/plot-distributions.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({
  selector: 'app-infection-rate',
  templateUrl: './infection-rate.component.html',
  styleUrls: ['./infection-rate.component.scss']
})
export class InfectionRateComponent {

  @Input() fileContent: any;

  pathogen!: string;
  reload: boolean = true;
  
  ngOnInit() {
    
    this.pathogen = this.fileContent['Simulation']['StartCondition']['pathogen']
    console.log(this.pathogen)
    this.eventEmitterService.emitTabChangedEvent.subscribe((id: number) => {

      if(id == 1){
      console.log("Tab")
      this.reload = false;
      setTimeout(() => {
        this.reload = true;
      }, 1);
    }
    });
  
  }
  
  
  constructor(private propertyDataService : PropertyDataService,  private eventEmitterService: EventEmitterService) {}

  // Method gets called after the user clicks one of the following different sections: Infection Rate, Time to recovery, Mild death rate, Critical death rate 
  // The Method communicates to the propertyDataService, which section the user clicked on
  // The propertyDataService then uses this information to communicate this information to the property-panel
  setProperty(property : string) : void {

    this.propertyDataService.setProperty(property);

    if (property == "Infection Rate") {
      this.propertyDataService.setDistribution(this.fileContent['Pathogens'][this.pathogen]['infection_rate']['distribution']);
      this.propertyDataService.setDistributionParameter(this.fileContent['Pathogens'][this.pathogen]['infection_rate']['parameters']);
    }
    else if (property == "Time to recovery") {
      this.propertyDataService.setDistribution(this.fileContent['Pathogens'][this.pathogen]['time_to_recovery']['distribution']);
      this.propertyDataService.setDistributionParameter(this.fileContent['Pathogens'][this.pathogen]['time_to_recovery']['parameters']);
    }
    else if (property == "Mild death rate") {
      this.propertyDataService.setDistribution(this.fileContent['Pathogens'][this.pathogen]['mild_death_rate']['distribution']);
      this.propertyDataService.setDistributionParameter(this.fileContent['Pathogens'][this.pathogen]['mild_death_rate']['parameters']);
    }
    else if (property == "Critical death rate") {
      this.propertyDataService.setDistribution(this.fileContent['Pathogens'][this.pathogen]['critical_death_rate']['distribution']);
      this.propertyDataService.setDistributionParameter(this.fileContent['Pathogens'][this.pathogen]['critical_death_rate']['parameters']);
    }  

  }
  
}