import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RepoService } from '../../core/services/repo.service';
import { Observable, Subject } from 'rxjs';
import { Repo } from '../../core/models/repo.model';
import { ConfService } from '../../core/services/conf.service';
import MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  wordpressUrl: string;
  bio: string;
  coverImg: string;
  largeCoverImg: string;
  md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  repos: Observable<Repo[]>;

  constructor(
    private titleService: Title,
    private repoService: RepoService,
    public confService: ConfService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('About me');
    this.repos = this.repoService.getRepos();
    this.getInfo();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }

  getInfo(): void {
    this.confService.getConf().subscribe(conf => {
      this.bio = this.md.render(conf.bio);
      this.facebookUrl = conf.facebookUrl;
      this.instagramUrl = conf.instagramUrl;
      this.twitterUrl = conf.twitterUrl;
      this.wordpressUrl = conf.wordpressUrl;
      this.coverImg = conf.coverUrl;
      this.largeCoverImg = `url(${conf.largeCover})`;
    })
  }
}
