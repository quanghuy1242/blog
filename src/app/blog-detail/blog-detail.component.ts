import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  @Input() blog: Blog;

  urlShared: string = window.location.origin + '/blog/post/';

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  share(name: string): void {
    const shareUrl = name === 'facebook' ? 'https://www.facebook.com/sharer/sharer.php?u=' : 'https://twitter.com/intent/tweet?text=';
    window.open(shareUrl + this.urlShared + this.blog.id, '_blank');
  }

  onCopied(): void {
    this.snackBar.open('The link of this post has been copied to clip board', 'Close', { duration: 2500 });
  }
}
