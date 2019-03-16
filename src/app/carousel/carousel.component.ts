import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  items = [
    {
      bgc: "yellow",
      height: 300
    },
    {
      bgc: "blue",
      height: 300
    },
    {
      bgc: "violet",
      height: 300
    }
  ];

  constructor() { }

  ngOnInit() {

  }

}
