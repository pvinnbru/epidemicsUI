import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-pathogenes',
  templateUrl: './pathogenes.component.html',
  styleUrls: ['./pathogenes.component.scss']
})
export class PathogenesComponent {

  currentValue: number[] = [];

  onSliderValueChanged(values: number[]) {
    this.currentValue = values;
  }


  @Input() fileContent: any;
  pathogen!: string;

  ngOnInit() {
    this.pathogen = this.fileContent['Simulation']['StartCondition']['pathogen'];
  }
}
