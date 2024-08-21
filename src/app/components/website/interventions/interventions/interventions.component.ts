import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})
export class InterventionsComponent implements OnChanges {

  showVaccine: boolean = true;
  
  @Input() fileContent: any;
  
  showVaccines() {
    if (this.showVaccine == false) {
      this.showVaccine = true;

    } else {
      this.showVaccine = false;
    }
  }

  daily_dose_strategy_active: boolean = false;


  ngOnChanges() {
    this.daily_dose_strategy_active = this.fileContent["Vaccines"]["Antitest"]["strategy"]["type"] == "DailyDoseStrategy";
  }


  onBlockDragOver(event: DragEvent): void {
    event.preventDefault();
    // Hier kannst du weitere Logik hinzufügen, falls benötigt
  }

  onBlockDrop(event: DragEvent): void {
    //Der unterliegende Code wird zunächst übersprungen, da bei Vorhandensein einer bereits hinzugefügten Intervention die id des Elements
    //gezogen wird, auf die das Element gerade abgelegt wurde. Dadurch wird die korrekte id des übergeordneten divs nicht erkannt.
    //Da es sonst keine elemente mit dragover und drop-eigenschaft gibt, kann davon ausgegangen werden, dass das korrekte div ausgewählt ist.
    //
    //event.preventDefault();  // Verhindert das Standardverhalten des Browsers
    //const dropTarget = event.target as HTMLElement;
    //if (dropTarget && dropTarget.id === 'dropZone') {
    // Hier kannst du die Logik hinzufügen, die ausgeführt werden soll,
    // wenn ein Element in der "dropZone" abgelegt wird.
    //console.log('Element wurde in der dropZone abgelegt');
    //}
    if (this.daily_dose_strategy_active) {
      alert("strategy already added");
    }
    else {
      event.preventDefault();
      if (event.dataTransfer) {
        if (event.dataTransfer.getData('text') == "block_daily_dose") {
          let strategy = {
            "type": "DailyDoseStrategy",
            "available_from": 0,
            "dose": 0
          };

          this.fileContent.Vaccines.Antitest.strategy = strategy;
          this.daily_dose_strategy_active = true;
        }
      }
    }
  }

  deleteStrategy(name: string) {
    if (name == "daily_dose") {
      delete this.fileContent.Vaccines.Antitest.strategy;
      this.daily_dose_strategy_active = false;
    }
  }
}
