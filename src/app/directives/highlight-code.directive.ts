import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: '[appHighlightCode]'
})
export class HighlightCodeDirective implements AfterViewInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  }

}
