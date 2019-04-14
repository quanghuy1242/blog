import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-button-share-menu',
  templateUrl: './button-share-menu.component.html',
  styleUrls: ['./button-share-menu.component.css']
})
export class ButtonShareMenuComponent implements OnInit {

  @Input() blogId: string;
  @Input() iconRev: string;
  @Input() textRev: string;
  @Input() nextTitle: string;
  @Input() isIcon: boolean;
  urlShared: string = window.location.origin;
  finalLink: string;
  shareUrl: string;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.finalLink = `${this.urlShared}/${this.nextTitle}/${this.blogId}`;
  }

  share(name: string): void {
    this.shareUrl =
      name === 'facebook'
        ? 'https://www.facebook.com/sharer/sharer.php?u='
        : 'https://twitter.com/intent/tweet?text=';
    window.open(this.shareUrl + this.finalLink, '_blank');
  }

  onCopied(): void {
    this.snackBar.open(
      'The link of this post is copied to clipboard',
      'Close',
      { duration: 2500 }
    );
  }
}
