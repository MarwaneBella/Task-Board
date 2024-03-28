import { Directive, ElementRef } from '@angular/core';
// import interact from 'interactjs';

@Directive({
  selector: '[interactDraggable]'
})
export class InteractDraggableDirective {

  // constructor(private el: ElementRef) {}

  // ngAfterViewInit() {
  //   interact(this.el.nativeElement).draggable({
  //     inertia: true,
  //     modifiers: [
  //       interact.modifiers.restrictRect({
  //         restriction: 'parent'
  //       })
  //     ],
  //     autoScroll: true,
  //     onmove: this.dragMoveListener
  //   });
  // }

  // private dragMoveListener(event :any) {
  //   const target = event.target;
  //   const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  //   const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  //   target.style.transform = `translate(${x}px, ${y}px)`;

  //   target.setAttribute('data-x', x);
  //   target.setAttribute('data-y', y);
  // }
}