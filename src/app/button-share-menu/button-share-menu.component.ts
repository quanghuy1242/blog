import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-button-share-menu',
  templateUrl: './button-share-menu.component.html',
  styleUrls: ['./button-share-menu.component.css']
})
export class ButtonShareMenuComponent implements OnInit {

  urlShared: string = window.location.origin + '/post/';
  @Input() blogId: string;
  @Input() iconRev: string;
  @Input() textRev: string;
  @Input() isIcon: boolean;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  share(name: string): void {
    const shareUrl = name === 'facebook' ? 'https://www.facebook.com/sharer/sharer.php?u=' : 'https://twitter.com/intent/tweet?text=';
    window.open(shareUrl + this.urlShared + this.blogId, '_blank');
  }

  onCopied(): void {
    this.snackBar.open('The link of this post is copied to clipboard', 'Close', { duration: 2500 });
  }
}
