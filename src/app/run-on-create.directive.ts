import { Directive, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[appRunOnCreate]'
})
export class RunOnCreateDirective implements OnInit {

  @Output() onCreate: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.onCreate.emit();
  }
}
