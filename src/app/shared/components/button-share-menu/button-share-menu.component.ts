import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-button-share-menu',
  templateUrl: './button-share-menu.component.html',
  styleUrls: ['./button-share-menu.component.css']
})
export class ButtonShareMenuComponent implements OnInit {

  urlShared: string = window.location.origin;
  @Input() blogId: string;
  @Input() iconRev: string;
  @Input() textRev: string;
  @Input() nextTitle: string;
  @Input() isIcon: boolean;
  finalLink: string;
  shareUrl: string;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.shareUrl = name === 'facebook' ? 'https://www.facebook.com/sharer/sharer.php?u=' : 'https://twitter.com/intent/tweet?text=';
    this.finalLink = `${this.shareUrl + this.urlShared}/${this.nextTitle}/${this.blogId}`
  }

  share(name: string): void {
    window.open(this.finalLink, '_blank');
  }

  onCopied(): void {
    this.snackBar.open('The link of this post is copied to clipboard', 'Close', { duration: 2500 });
  }
}
