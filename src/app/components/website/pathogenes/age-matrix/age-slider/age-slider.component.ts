import { Component, ElementRef, HostListener, Input, Renderer2, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-age-slider',
  templateUrl: './age-slider.component.html',
  styleUrls: ['./age-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//adding the sliders to the age matrix

export class AgeSliderComponent implements OnInit {

  /*
  valueChanged: Event to notify other components that the value was changed.
  givenIndex: Obtaining the index of the age group configuration to load at the beginning.
  pathogen: Saves the name of the pathogen in the file.
  handleIndices: Array of numbers to generate the slider.
  selectedIndex: Initial values of the slider.
  rangeValues: Saves the size of the groups (Asymptomatic, mild, severe, and critical).
  startLeftPosition: The position of the slider.
  colorList: Slider colors.
  colorListInSlider: Color of the space between the slider handles.
  fieldName: Different group names.
  mousemoveListener: Event listener to track the mouse position for sliding the sliders.
  mouseupListener: Event listener to detect when the mouse button is released.
  activeHandleIndex: Indicates which slider handle is being manipulated.
  initialMousePositionX: Tracks the initial mouse position during slider interaction.
  */
  @Output() valueChanged = new EventEmitter<number[]>();

  @Input() givenIndex: number = 0;
  @Input() fileContent: any;
  pathogen!: string;

  handleIndices = [0, 1, 2];
  selectedIndex: number[] = [0.5, 0.7, 0.9]; 
  rangeValues: number[] = [1, 0, 0, 0];
  startLeftPosition: number[] = [0, 0, 0];
  colorList: string[] = ['#808B96', '#33A8FF', '#000'];
  colorListInSlider: string[] = ['#49FF33', '#F4D03F', '#FF9F33', '#FF3933'];
  fieldName: string[] = ['Asymptomatic', 'Mild', 'Severe', 'Critical']

  private isInputFocused: boolean = false;

  private mousemoveListener: ((event: MouseEvent) => void) | null = null;

  private mouseupListener: (() => void) | null = null;
  private activeHandleIndex: number | null = null;
  private initialMousePositionX = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  //To load defealt values at the beginning
  ngOnInit() {

    this.pathogen = this.fileContent['Simulation']['StartCondition']['pathogen'];
    if (this.fileContent['Pathogens'][this.pathogen]['dpr']['stratification_matrix'].length - 1 < this.givenIndex) {
      this.rangeValues = [1, 0, 0, 0]
    } else {
      this.rangeValues = this.fileContent['Pathogens'][this.pathogen]['dpr']['stratification_matrix'][this.givenIndex]
    }

    this.valueChanged.emit(this.rangeValues);
  }


  ngAfterViewInit() {
    
    this.concreteValuesToSelectedValues();
    this.updateSliderHandles();

    const sliderHandles = this.elementRef.nativeElement.querySelectorAll('.slider-handle');
    //making the handels better visible
    sliderHandles[2].style.width = '25px';
    sliderHandles[2].style.height = '25px';
    sliderHandles[1].style.width = '20px';
    sliderHandles[1].style.height = '20px';
    sliderHandles[0].style.width = '15px';
    sliderHandles[0].style.height = '15px';

    sliderHandles[0].style.zIndex = '3';
    sliderHandles[1].style.zIndex = '2';
    sliderHandles[2].style.zIndex = '1';
  
  }

  @HostListener('document:mouseup')
  documentMouseup() {
    // Remove listeners
    this.removeListeners();
  }

  documentMousemove(e: any) {
    if (this.activeHandleIndex !== null && e.buttons === 1 && !this.isInputFocused) {
      // Check if the left mouse button is pressed and the input is not focused
      const index = this.activeHandleIndex;
      this.dragging(e, index);
    }
  }


  mousedown(e: any, index: number) {
    const target = e.target || e.srcElement;

    if (e.button === 0 && target.classList.contains('slider-handle')) {
      // Only proceed if the left mouse button is clicked on the slider-handle (not the slider)
      this.activeHandleIndex = index;
      this.startLeftPosition[index] = this.selectedIndex[index];
      this.initialMousePositionX = e.pageX; // Use pageX for absolute positioning

      // Remove previous listeners (if any)
      this.removeListeners();

      // Add new listeners and store references
      this.mousemoveListener = this.documentMousemove.bind(this);
      this.mouseupListener = this.documentMouseup.bind(this);
      addEventListener('mousemove', this.mousemoveListener);
      addEventListener('mouseup', this.mouseupListener);
    }
  }

  removeListeners() {
    // Remove listeners using the stored references
    if (this.mousemoveListener) {
      removeEventListener('mousemove', this.mousemoveListener as EventListener);
      this.mousemoveListener = null;
    }

    if (this.mouseupListener) {
      removeEventListener('mouseup', this.mouseupListener as EventListener);
      this.mouseupListener = null;
    }
  }
  dragging(e: any, index: number) {
    const sliderWidth = this.elementRef.nativeElement.querySelector('.slider').clientWidth;
    const draggedPosition = ((e.clientX - this.initialMousePositionX) / sliderWidth);
    const newPosition = Math.max(0, Math.min(this.startLeftPosition[index] + draggedPosition, 1));
    this.adjustSelectedIndex(newPosition, index, "drag");
  }

  ngOnDestroy() {
    // Ensure listeners are removed when the component is destroyed
    this.removeListeners();
  }

  updateSliderHandles() {
    const sliderHandles = this.elementRef.nativeElement.querySelectorAll('.slider-handle');
    const sliderMark = this.elementRef.nativeElement.querySelectorAll('.slider-mark');
    const slider = this.elementRef.nativeElement.querySelectorAll('.slider')[0].getBoundingClientRect();

    //Update slide-handles
    this.handleIndices.forEach((i) => {
      const x = this.round(this.selectedIndex[i] * 100);
      if (sliderHandles[i]) {
        sliderHandles[i].style.left = x + '%';        
      }
    });

    //Update slider colors
    sliderMark[0].style.width = this.selectedIndex[0]*100 + '%';
    sliderMark[0].style.left = this.selectedIndex[0]*100 + '%';

    sliderMark[1].style.width = (this.selectedIndex[1] - this.selectedIndex[0])*100 +'%';
    sliderMark[1].style.left = this.selectedIndex[1]*100 + '%';

    sliderMark[2].style.width = (this.selectedIndex[2] - this.selectedIndex[1])*100 +'%';
    sliderMark[2].style.left = this.selectedIndex[2]*100 + '%';

    sliderMark[3].style.width = (1 - this.selectedIndex[2]) * 100 + '%';
    sliderMark[3].style.left = '100%';

    //Update the rangeValues
    this.rangeValues[0] = this.round(this.selectedIndex[0]);
    this.rangeValues[1] = this.round(this.selectedIndex[1] - this.selectedIndex[0]);
    this.rangeValues[2] = this.round(this.selectedIndex[2] - this.selectedIndex[1]);
    this.rangeValues[3] = this.round(1 - this.selectedIndex[2]);
  }
  

  round(num: number) {
    return (parseFloat(num.toFixed(5)))
  }

  setSelectedIndex(num: number, index: number) {
    this.selectedIndex[index] = num;
  }

  adjustSelectedIndex(num: number, index: number, input: string) {
    // Save the current state before making changes

    if ((num < 0 || num > 1) && input === "slider") {
      if (index >= 1) {
        num = this.selectedIndex[index - 1]; // Assign a value to num
      } else {
        num = this.selectedIndex[index + 1]; // Assign a value to num
      }
    }

    num = this.round(num);

    // Check the condition after updating the specific index
    if (input === "slider") {

      this.setSelectedIndex(num, index)
      if (this.selectedIndex[0] > this.selectedIndex[2]) {

        this.setSelectedIndex(num, 2)
        this.setSelectedIndex(num, 1)
        this.setSelectedIndex(num, 0)
      }

      if (this.selectedIndex[0] > this.selectedIndex[1]) {
        this.setSelectedIndex(num, 0)
        this.setSelectedIndex(num, 1)
      }

      if (this.selectedIndex[1] > this.selectedIndex[2]) {
        this.setSelectedIndex(num, 1)
        this.setSelectedIndex(num, 2)
      }
    } else if (input === 'concreteValues') {
      // Convert string to number for each element in rangeValues
      this.rangeValues = this.rangeValues.map((item) => (typeof item === 'string' ? parseFloat(item) : item));

      // Calculate the sum of rangeValues
      const sum = this.rangeValues.reduce((sum, elem) => sum + elem, 0);
      

      if (sum > 1) {
        // Handle case when the sum is greater than one
        let temp: number[];
        let bool = false;

        // Check if any element in rangeValues is greater than 1
        this.rangeValues.forEach((item, index) => {
          if (item > 1) {
            
            temp = [0, 0, 0, 0];
            temp[index] = 1;
            temp[index + 1] = 1;
            temp[index + 2] = 1;
            temp[index + 3] = 1;
            this.selectedIndex = temp.slice(0, 3);
            bool = true;
            this.updateSliderHandles();
            return;
          }
        });

        // If no element in rangeValues is greater than 1, perform additional adjustments
        if (!bool) {
          for (let i = 0; i < this.rangeValues.length; i++) {
            let missing = this.round(sum - 1);
            for (let j = 3; j >= 0; j--) {
              if (i !== j) {
                if (this.rangeValues[j] >= missing) {
                  this.rangeValues[j] = this.round(this.rangeValues[j] - missing);

                  this.concreteValuesToSelectedValues();
                  return;
                } else {
                  missing = missing - this.rangeValues[j];
                  this.rangeValues[j] = 0;
                }
              }
            }
          }
        }
      } else if (sum < 1) {
        if (index != 3) {
          this.rangeValues[index + 1] = this.rangeValues[index + 1] + 1 - sum
        } else {
          this.rangeValues[index] = this.rangeValues[index] + 1 - sum
        } 
      }
      this.concreteValuesToSelectedValues();
    }

    else if (input == "drag") {
      this.setSelectedIndex(num, index)
      if (!(this.selectedIndex[0] < this.selectedIndex[1])) {
        if (index == 0) {
          this.selectedIndex[0] = this.selectedIndex[1]
        } else if (index == 1) {
          this.selectedIndex[1] = this.selectedIndex[0]
        }
      }

      if (!(this.selectedIndex[1] < this.selectedIndex[2])) {
        if (index == 1) {
          this.selectedIndex[1] = this.selectedIndex[2]
        } else if (index == 2) {
          this.selectedIndex[2] = this.selectedIndex[1]
        }
      }

    }
    
    this.valueChanged.emit(this.rangeValues);
    this.updateSliderHandles();
  }

  concreteValuesToSelectedValues() {
    this.setSelectedIndex(this.round(this.rangeValues[0]), 0);
    this.setSelectedIndex(this.round(this.rangeValues[1] + this.rangeValues[0]), 1);
    this.setSelectedIndex(this.round(this.rangeValues[2] + this.rangeValues[1] + this.rangeValues[0]), 2);
    this.updateSliderHandles();
  }

  getSelectedIndex() {
    return this.selectedIndex;
  }


  handleInputChange(event: any, index: number, origin: string) {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      this.adjustSelectedIndex(inputValue, index, origin);
    }else if(origin == "slider"){
      //to handle if there is not a number as input
      this.concreteValuesToSelectedValues();
    }else if(origin == "concreteValues"){
      //to handle if there is not a number as input
      this.updateSliderHandles();
    }
  }
}