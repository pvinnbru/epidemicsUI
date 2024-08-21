import { Component, ElementRef, HostListener, Input, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  template: `<div>{{ currentTime }}</div>`
})
export class DragAndDropComponent {
  hero1 = {
    Label: "Type",
    Liste: ["I-Strategy", "S-Strategy"],
    Translations: ["IStrategy", "SStrategy"]
  }
  hero2 = {
    Label: "Measuretype",
    Liste: ["Self-Isolation", "Cancel Safe-Isolation", "Symptom Self-Isolation", "Find Setting Members", "Test", "Contact Identification", "Condition Measure"],
    Translations: ["SelfIsolation", "CancelSelfIsolation", "SymptomSelfIsolation", "FindSettingMembers", "Test", "ContactIdentification", "ConditionMeasure"]
  }
  hero3 = {
    Label: "Settings-Type",
    Liste: [""],
    Translations: [""]
  }
  hero4 = {
    Label: "Followup-Strategy",
    Liste: [""],
    Translations: [""]
  }
  hero5 = {
    Label: "Test-Type",
    Liste: ["PCR-Test", "Antigen-Test", "Antibody-Test", "Antitest-Test"],
    Translations: ["pcr_test", "antigen_test", "antibody_test", "antitest_test"]
  }

  hero6 = {
    Label: "Followup-Strategy",
    Liste: [""],
    Translations: [""]
  }
  hero7 = {
    Label: "Condition",
    Liste: [""],
    Translations: [""]
  }

  @Input() fileContent!: any;

  constructor(private elementRef: ElementRef) {
    afterNextRender(() => { this.ngOnInit(); })
  }

  ngOnInit() {    
    if (this.fileContent['Interventions'] != undefined) {
      this.loadSettings();
      this.loadStrategies("");
    }
  }

  getStrategies() {
    return Object.keys(this.fileContent['Interventions']['Strategies']);
  }

  getMeasures(strategy: number) {
    return Object.keys(this.fileContent['Interventions']['Strategies'][this.getStrategies()[strategy]]['Measures']);
  }
  
  addStrategy() {
    const new_strategy = {
      "type": "IStrategy",
      "Measures": {
          "Measure1": {
              "measuretype": "CancelSelfIsolation",
              "Delay": {
                  "distribution": "Poisson",
                  "parameters": [
                      0
                  ]
              },
              "Parameters": {}
          }
      }
    }
    this.fileContent.Interventions.Strategies['New Strategy'] = new_strategy;
  }

  addMeasure(strategyIndex: number) {
    const new_measure = {
      "measuretype": "CancelSelfIsolation",
      "Delay": {
          "distribution": "Poisson",
          "parameters": [
              0
          ]
      },
      "Parameters": {}
    };
    let measureName = this.getMeasures(strategyIndex)[this.getMeasures(strategyIndex).length - 1];
    measureName = measureName.replace("Measure", "");
    measureName = String(Number(measureName) + 1);
    measureName = "Measure" + measureName;
    this.fileContent.Interventions.Strategies[this.getStrategies()[strategyIndex]].Measures[measureName] = new_measure;
  }

  deleteMeasure(strategyIndex: number, measureIndex: number) {
    delete this.fileContent.Interventions.Strategies[this.getStrategies()[strategyIndex]].Measures[this.getMeasures(strategyIndex)[measureIndex]];
    for (let i = measureIndex; i < this.getMeasures(strategyIndex).length; i++) {
      let measureName = this.getMeasures(strategyIndex)[i];
      measureName = measureName.replace("Measure", "");
      measureName = String(Number(measureName) - 1);
      measureName = "Measure" + measureName;
      this.fileContent.Interventions.Strategies[this.getStrategies()[strategyIndex]].Measures[measureName] = this.fileContent.Interventions.Strategies[this.getStrategies()[strategyIndex]].Measures[this.getMeasures(strategyIndex)[i]];
      delete this.fileContent.Interventions.Strategies[this.getStrategies()[strategyIndex]].Measures[this.getMeasures(strategyIndex)[i]];
    }
  }

  getStrategyType(value: string) {
    switch (value) {
      case "IStrategy":
        return "I-Strategy";
      case "SStrategy":
        return "S-Strategy";
      default:
        return "";
    }
  }

  getMeasureType(value: string) {
    switch (value) {
      case "SelfIsolation":
        return "Self-Isolation";
      case "CancelSelfIsolation":
        return "Cancel Safe-Isolation";
      case "SymptomSelfIsolation":
        return "Symptom Self-Isolation";
      case "FindSettingMembers":
        return "Find Setting Members";
      case "Test":
        return "Test";
      case "ContactIdentification":
        return "Contact Identification";
      case "ConditionMeasure":
        return "Condition Measure";
      default:
        return "";
    }
  }

  getTestType(value: string) {
    switch (value) {
      case "pcr_test":
        return "PCR-Test";
      case "antigen_test":
        return "Antigen-Test";
      case "antibody_test":
        return "Antibody-Test";
      case "antitest_test":
        return "Antitest-Test";
      default:
        return "";
    }
  }

  generateNumbers(value: number): number[] {
    let returnNummer: number[] = []
    for (let i = 0; i < value; i++) {
      returnNummer.push(i);
    }
    return returnNummer.flat();
  }

  loadSettings() {
    let settingsType = Object.keys(this.fileContent['Settings']);
    this.hero3.Liste = [];
    this.hero3.Translations = [];
    for (let i = 0; i < settingsType.length - 1; i++) {
      this.hero3.Liste.push(settingsType[i]);
      this.hero3.Translations.push(settingsType[i]);
    }
  }

  loadStrategies(mystrategy: string) {
    this.hero4.Liste = this.getStrategies();
    this.hero6.Liste = this.getStrategies();
    this.hero4.Translations = this.getStrategies();
    this.hero6.Translations = this.getStrategies();
    if (this.hero6.Liste.includes("nothing") == false) {
      this.hero6.Translations.push("nothing");
      this.hero6.Liste.push("nothing");
    }
    if (mystrategy != "") {
      this.hero4.Liste.splice(this.getStrategies().indexOf(mystrategy), 1);
      this.hero6.Liste.splice(this.getStrategies().indexOf(mystrategy), 1);
      this.hero4.Translations.splice(this.getStrategies().indexOf(mystrategy), 1);
      this.hero6.Translations.splice(this.getStrategies().indexOf(mystrategy), 1);
    }
  }
}