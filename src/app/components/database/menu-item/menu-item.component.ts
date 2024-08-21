import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input() item: any;
  @Output() itemSelected = new EventEmitter<string>();
  @Output() selectionMade = new EventEmitter<any>();
  
  onSelect(item: any): void {
    this.itemSelected.emit(item); // passing the complete object
    this.selectionMade.emit(item); // passing the complete object (key is still with parent objects)
  }

  getLastPartOfKey(key: string): string {
    const parts = key.split('.');
    return parts[parts.length - 1];
  }
}

