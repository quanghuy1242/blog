import { Component, OnInit } from '@angular/core';
import { ConfService } from '../services/conf.service';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent implements OnInit {
  backgroundImage: string;
  slogan: string;
  mainTitle: string;
  
  constructor(
    public confService: ConfService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(): void {
    this.confService.getConf().subscribe(conf => {
      this.mainTitle = conf.mainTitle;
      this.slogan = conf.slogan;
      this.backgroundImage = `url(${conf.homeImageUrl})`
    })
  }
}
