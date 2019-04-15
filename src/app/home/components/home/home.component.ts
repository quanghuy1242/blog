import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Count } from '../../../core/models/count'
import { ConfService } from '../../../core/services/conf.service';
import { DialogWelcomeComponent } from '../../../shared/components/dialog-welcome/dialog-welcome.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mainTitle: string;

  constructor(
  	private titleService: Title,
    public dialog: MatDialog,
    public confService: ConfService,
    private meta: Meta,
    private title: Title
  	) { }

  ngOnInit() {
    this.getInfo();
    if (Count.countDialogWelcome === 1) this.showWelcome();
  }

  getInfo(): void {
    this.confService.getConf().subscribe(conf => {
      this.mainTitle = conf.mainTitle;
      this.titleService.setTitle(`${this.mainTitle} - Home`);
      this.setMetaData(conf);
    })
  }

  showWelcome(): void {
    setTimeout(() => {
      this.dialog.open(DialogWelcomeComponent, {
        width: '400px',
        height: '400px',
        data: { title: 'Xin chào', content: 'Sẽ mất một ít thời gian để nhận dữ liệu từ server để load trang! Chúc các bạn một ngày thật vui vẻ!' },
        disableClose: true
      });
    });
    Count.countDialogWelcome = 2;
  }

  setMetaData(data) {
    this.title.setTitle(`${this.mainTitle} - Home`);

    this.meta.updateTag({ 'name': 'keywords', 'content': 'Quang Huy Blog' });
    this.meta.updateTag({ 'name': 'description', 'content': data.slogan });
    this.meta.updateTag({ 'name': 'twitter:card', 'content': 'summary_large_image' });
    this.meta.updateTag({ 'name': 'twitter:title', 'content': data.mainTitle });
    this.meta.updateTag({ 'name': 'twitter:text:title', 'content': data.mainTitle });
    this.meta.updateTag({ 'name': 'twitter:description', 'content': data.slogan });
    this.meta.updateTag({ 'name': 'twitter:image', 'content': data.homeImageUrl });
    this.meta.updateTag({ 'name': 'twitter:image:alt', 'content': data.mainTitle });
    this.meta.updateTag({ 'property': 'og:title', 'content' : data.mainTitle });
    this.meta.updateTag({ 'property': 'og:url', 'content': 'https://quanghuy.netlify.com/home' });
    this.meta.updateTag({ 'property': 'og:image', 'content': data.homeImageUrl });
    this.meta.updateTag({ 'property': 'og:image:alt', 'content': data.mainTitle });
    this.meta.updateTag({ 'property': 'og:description', 'content': data.slogan });
  }
}
