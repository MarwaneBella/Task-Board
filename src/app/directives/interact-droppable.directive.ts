// interact-droppable.directive.ts
import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
// import interact from '@interactjs/interact';

@Directive({
  selector: '[interactDroppable]'
})
export class InteractDroppableDirective {

  // @Output() taskDropped = new EventEmitter<any>();

  // constructor(private el: ElementRef) {}

  // ngAfterViewInit() {
  //   interact(this.el.nativeElement).dropzone({
  //     ondrop: (event :any) => this.taskDropped.emit(event.relatedTarget.id)
  //   }); 
  // }
}