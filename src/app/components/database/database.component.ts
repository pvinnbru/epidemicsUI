import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { DataService } from 'src/app/services/data.service';
import { empty } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { MatDialogRef } from '@angular/material/dialog';



interface Filter {
  value: any;
  type: any;
}



@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent{

  constructor(
    private dataService: DataService,
    private currentUserService: CurrentUserService,
    private fileService: FileService,
    public dialogRef: MatDialogRef<DatabaseComponent>,
    ) {}

  //attributes which to exclude for the filter option
  excludedAttributes: string[] = ['_id', ]; // add attribute names to exclude them

  items: any[] = [];
  filteredItems: any[] = [];
  filters: { [key: string]: Filter } = {};
  showFilterMenu: boolean = false;
  showAddMenu: boolean = false;
  itemAttributes: any[] = [];
  selectedFilterOptions: any[] = [];
  queryParams: any;
  appliedFilters: any[] = [];


  openItemAsJson(item: any) {
    const itemJson = JSON.stringify(item.toml, null, 3); // Pretty print JSON
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<pre>${itemJson}</pre>`);
    }
    else {
      console.error('Failed to open new window');
    }
  }

  ngOnInit() {
    this.dataService.getItems(this.queryParams).subscribe(data => {
      this.items = data;
      let slicedData = data.slice(0, 20);
      this.filteredItems = data;
      
    
        
      // just doing it for the first one of slicedData as of now
    for (let item of slicedData) {
      // Merge attributes from each item, preventing duplicates
      const itemAttrs = this.extractAttributes(item);
      for (let attr of itemAttrs) {
        if (!this.itemAttributes.some(a => a.key === attr.key)) {
          this.itemAttributes.push(attr);
        }
      }   
    }
    });
  }



  private extractAttributes(item: any, parentKey: string = ''): any[] {
    let attributes = [];
    for (const key in item) {
      if (!item.hasOwnProperty(key) || this.excludedAttributes.includes(key)) {
        continue;
      }
      const attributeKey = parentKey ? `${parentKey}.${key}` : key;
  
      if (typeof item[key] === 'object' && item[key] !== null && !Array.isArray(item[key])) {
        // recursive call for nested objects
        attributes.push({ key: attributeKey, children: this.extractAttributes(item[key], attributeKey) });
      } else {
        // push if it is no nested object
        attributes.push({ key: attributeKey, value: item[key] });
      }
    }
    return attributes;
  }

  
  selectOption(option: string, attribute: string) {
    // Update the value for the selected attribute
    this.filters[attribute].value = option;
  }
  
      openFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu;
      this.showAddMenu = false;
    }

    openAddMenu() {
      this.showAddMenu = !this.showAddMenu;
    }

    onSelectFilterOption(option: any): void {
      this.selectedFilterOptions.push(option);
    }


  getLastPartOfKey(key: string): string {
    const parts = key.split('.');
    return parts[parts.length - 1];
  }


  

getFilterOptions(attribute: string): any[] {
  let options = this.items.slice(0, 50).map(item => item[attribute]); //just mapping for the first 50

  let optionSet = [...new Set(options)]; //unique values from attributes

  return optionSet
}

onSelectFilterCriteria(criteria: any) {
  this.appliedFilters.push(criteria);
}


// applying filters by transforming the filter options into query parameters and then calling the data service to get the filtered items
applyFilters() {

  this.queryParams = this.dataService.buildQueryParams(this.appliedFilters);
  
  this.dataService.getItems(this.queryParams).subscribe(data => {
    this.items = data;
  });

  this.openFilterMenu();
}


onToggleChange(event: MatSlideToggleChange){
  const userEmail = this.currentUserService.getLoggedInUserEmail();
  if (userEmail === null) {
    // Handle the case when userEmail is null
    return;
  }

  const filterValue =
  {
    "filterType": "contains",
    "inputValue": userEmail,
    "attribute": "author"
}
  if (event.checked) 
  { //set to my files
    
      this.appliedFilters.push(filterValue)
      this.applyFilters();
  
  } 
  else 
  { //set to all files
    
    this.removeFromFilters(filterValue.inputValue);
    this.applyFilters()
    
  }
}

removeFromFilters(attribute: any) {
  this.appliedFilters = this.appliedFilters.filter(
    filter => filter.selectedFilterType !== attribute.selectedFilterType 
    && filter.inputValue !== attribute.inputValue);

}



removeFilterOption(filterOption: any) {
  
  const index = this.selectedFilterOptions.indexOf(filterOption);
  if (index > -1) {
    this.selectedFilterOptions.splice(index, 1);
  }

  this.removeFromFilters(filterOption);
}

// creating a new file in the workbench database
openInEditor(item: any){

  this.fileService.addToWorkbench(item);
  
  
  setTimeout(() => {
    this.dialogRef.close();
  }, 500);
}

}
