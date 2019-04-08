import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Count } from '../models/count'
import { ConfService } from '../services/conf.service';
import { DialogWelcomeComponent } from '../dialog-welcome/dialog-welcome.component';

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
    public confService: ConfService
  	) { }

  ngOnInit() {
    this.getInfo();
    if (Count.countDialogWelcome === 1) this.showWelcome();
  }

  getInfo(): void {
    this.confService.getConf().subscribe(conf => {
      this.mainTitle = conf.mainTitle;
      this.titleService.setTitle(`${this.mainTitle} - Home`);
    })
  }

  showWelcome(): void {
    setTimeout(() => {
      this.dialog.open(DialogWelcomeComponent, {
        width: '400px',
        height: '400px',
        data: { title: 'Xin chào', content: "Sẽ mất một ít thời gian để nhận dữ liệu từ server để load trang! Chúc các bạn một ngày thật vui vẻ!" },
        disableClose: true
      });
    });
    Count.countDialogWelcome = 2;
  }
}
