import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    private repoService: RepoService,
    public confService: ConfService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
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
      this.setMetaData({
        title: 'About me - Quang Huy',
        description: 'Giới thiệu blog cá nhân',
        image: conf.coverUrl
      });
    })
  }

  setMetaData(data) {
    this.title.setTitle(data.title);

    this.meta.updateTag({ 'name': 'keywords', 'content': 'Quang Huy Blog' });
    this.meta.updateTag({ 'name': 'description', 'content': data.description });
    this.meta.updateTag({ 'name': 'twitter:card', 'content': 'summary_large_image' });
    this.meta.updateTag({ 'name': 'twitter:title', 'content': data.title });
    this.meta.updateTag({ 'name': 'twitter:text:title', 'content': data.title });
    this.meta.updateTag({ 'name': 'twitter:description', 'content': data.description });
    this.meta.updateTag({ 'name': 'twitter:image', 'content': data.image });
    this.meta.updateTag({ 'name': 'twitter:image:alt', 'content': data.title });
    this.meta.updateTag({ 'property': 'og:title', 'content' : data.title });
    this.meta.updateTag({ 'property': 'og:url', 'content': `https://quanghuy.netlify.com/about` });
    this.meta.updateTag({ 'property': 'og:image', 'content': data.image });
    this.meta.updateTag({ 'property': 'og:image:alt', 'content': data.title });
    this.meta.updateTag({ 'property': 'og:description', 'content': data.description });
  }
}
