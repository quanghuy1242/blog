import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  facebookUrl: string = "https://www.facebook.com/quanghuy124";
  instagramUrl: string = "https://www.instagram.com/quanghuy1242";
  twitterUrl: string = "https://twitter.com/quanghuy1242";
  wordpressUrl: string = "https://quanghuy1242.wordpress.com";
  constructor() { }

  ngOnInit() {
  }

}
