import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../core/models/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-welcome',
  templateUrl: './dialog-welcome.component.html',
  styleUrls: ['./dialog-welcome.component.css']
})
export class DialogWelcomeComponent implements OnInit {
  imgWelcomes: Array<{ id: string, path: string }> = [
    { id: '1', path: 'assets/images/welcome/bad.svg' },
    { id: '2', path: 'assets/images/welcome/hello.svg' },
    { id: '3', path: 'assets/images/welcome/birthday.svg' },
  ];
  randomPath: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.randomPath = this.randomPathWelcomeImage();
  }

  randomPathWelcomeImage(): string {
    let randomIndex: number = Math.floor(Math.random() * ((this.imgWelcomes.length - 1) - 0 + 1)) + 0;
    return this.imgWelcomes[randomIndex].path;
  }

}
