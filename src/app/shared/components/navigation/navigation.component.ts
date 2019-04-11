import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ConfService } from '../../../core/services/conf.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() snav: any;
  @Input() isMobile: boolean;
  mainTitle: string;

  urlSocials = [];
  constructor(
    public authService: AuthService,
    public confService: ConfService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(): void {
    this.confService.getConf().subscribe(conf => {
      this.mainTitle = conf.mainTitle;
      this.urlSocials = [
        {
          name : "Facebook",
          url: conf.facebookUrl,
          logo: "assets/logos/facebook.svg"
        },
        {
          name : "Instagram",
          url: conf.instagramUrl,
          logo: "assets/logos/instagram.svg"
        },
        {
          name : "Twitter",
          url: conf.twitterUrl,
          logo: "assets/logos/twitter.svg"
        },
        {
          name : "Wordpress",
          url: conf.wordpressUrl,
          logo: "assets/logos/wordpress.svg"
        }
      ]
    })
  }

}
