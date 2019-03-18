import { Component, OnInit, Input } from '@angular/core';

export interface CarouselItem {
  background: string;
  height: number;
};

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() items: CarouselItem[];
  currentIndex: number = 0;

  constructor() { }

  ngOnInit() {
    this.changeIndex(3000);
  }

  changeIndex(milliseconds: number): void {
    setInterval(() => {
      if (this.currentIndex === this.items.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }, milliseconds);
  }

}
