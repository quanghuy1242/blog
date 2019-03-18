import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent implements OnInit {
  carouselItem = [
    {
      background: "violet",
      height: 300
    },
    {
      background: "yellow",
      height: 300
    },
    {
      background: "url('../../assets/images/cover2.jpg')",
      height: 300
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
