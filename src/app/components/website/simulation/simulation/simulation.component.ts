import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})

export class SimulationComponent {
  @Input() fileContent: any;

}
