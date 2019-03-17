import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { Count } from '../models/count'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
  	private titleService: Title,
    public dialog: MatDialog
  	) { }

  ngOnInit() {
    this.titleService.setTitle('Dark Blue Pattern - Home');
    if (Count.countDialogWelcome === 1) this.showWelcome();
  }

  showWelcome(): void {
    setTimeout(() => {
      this.dialog.open(DialogInfoComponent, {
        width: '300px',
        data: { title: 'Xin chào', content: "Chúc các bạn một ngày thật vui vẻ!" }
      });
    });
    Count.countDialogWelcome = 2;
  }
}
