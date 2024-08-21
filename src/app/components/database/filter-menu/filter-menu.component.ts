import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit{

  @Input() filterOption: any;

  @Output() filterCriteriaSelected = new EventEmitter<any>();




  filterTypes: string[] = [];

  selectedFilterType: string = '';
  inputValue: any;

  constructor() {

  }

  ngOnInit(): void {
    this.filterTypes = [];
    this.determineFilterTypes();
    console.log('Filter Option:', this.filterOption.value);
  }

  determineFilterTypes() {
    let value = this.filterOption.value;
    
    if (typeof value === 'string') {
      this.filterTypes = ['contains', 'startsWith', 'endsWith'];
    } else if (typeof value === 'number') {
      this.filterTypes = ['equals', 'greaterThan', 'lessThan'];
    } else if (value instanceof Date) {
      this.filterTypes = ['before', 'after', 'on'];
    }

  }

  private emitFilterCriteria() {
    this.filterCriteriaSelected.emit({
      filterType: this.selectedFilterType,
      inputValue: this.inputValue,
      attribute: this.filterOption.key
    });
  }

  onInputValueChange() {
    this.emitFilterCriteria();
  }

  onFilterTypeChange(selectedType: string) {
    this.selectedFilterType = selectedType;
    this.emitFilterCriteria();
  }


}
