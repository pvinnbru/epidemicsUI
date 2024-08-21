import { Component, Input, OnInit } from '@angular/core';
import { PropertyDataService } from 'src/app/services/property-data.service';

@Component({
  selector: 'app-start-condition',
  templateUrl: './start-condition.component.html',
  styleUrls: ['./start-condition.component.scss']
})
export class StartConditionComponent implements OnInit {

  @Input() fileContent: any;

  type = {
    Label: "Start type",
    Liste: ["Standard", "Infected Fraction"],
    Translations: ["Standard", "InfectedFraction"]
  };

  // New properties for grid and slider
  sliderValue: number = 0;
  dots: { filled: boolean }[] = [];
  fillSequence: number[] = [];

  constructor(private propertyDataService: PropertyDataService) {}

  ngOnInit() {
    // Initialize the grid with 1000 dots
    for (let i = 0; i < 1000; i++) {
      this.dots.push({ filled: false });
      this.fillSequence.push(i);
    }

    // Shuffle the fill sequence
    this.shuffleArray(this.fillSequence);
      this.sliderValue = this.fileContent['Simulation']['StartCondition']['fraction'];
      this.updateGrid()
    }
  
  

  updateSlider(event: any){
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim(); // Trim to remove leading/trailing whitespaces
    
    // Try to parse the input value as a float
    const parsedValue = parseFloat(inputValue);
    
    this.sliderValue = parsedValue;
    this.updateGrid()
  }

  getStarttype(value: string): string {
    switch (value) {
      case 'InfectedFraction':
        return "Infected Fraction";
      case 'Standard':
        return value;
      default:
        return '';
    }
  }

  deleteVal(value: string) {
    if (value == 'fraction') {
      // Handle deletion logic if needed
    }
  }

  // Update the grid based on the slider value
  updateGrid() {
    const filledDotsCount = Math.round(1000 * this.sliderValue);
  
    // Reset all dots
    this.dots.forEach(dot => dot.filled = false);
  
    // Fill dots based on the shuffled fill sequence
    for (let i = 0; i < filledDotsCount; i++) {
      const dotIndex = this.fillSequence[i];
      this.dots[dotIndex].filled = true;
    }
  
    // Update the 'fraction' property in the fileContent
    const fractionLoadin = 'Simulation.StartCondition.fraction'.split('.');
    this.fileContent[fractionLoadin[0]][fractionLoadin[1]][fractionLoadin[2]] = this.sliderValue;
  }

  async setProperty(property: string): Promise<void> {
      this.propertyDataService.setProperty(property);
      }
  
// Fisher-Yates shuffle algorithm
private shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

}
