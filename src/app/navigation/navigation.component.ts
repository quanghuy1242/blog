import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() snav: any;
  @Input() isMobile: boolean;

  urlSocials = [
    {
      name : "Facebook",
      url: "https://www.facebook.com/quanghuy124",
      logo: "assets/logos/facebook.svg"
    },
    {
      name : "Instagram",
      url: "https://www.instagram.com/quanghuy1242",
      logo: "assets/logos/instagram.svg"
    },
    {
      name : "Twitter",
      url: "https://twitter.com/quanghuy1242",
      logo: "assets/logos/twitter.svg"
    },
    {
      name : "Wordpress",
      url: "https://quanghuy1242.wordpress.com",
      logo: "assets/logos/wordpress.svg"
    }
  ]
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
