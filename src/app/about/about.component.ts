import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RepoService } from '../services/repo.service';
import { Repo } from '../models/repo.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  facebookUrl: string = "https://www.facebook.com/quanghuy124";
  instagramUrl: string = "https://www.instagram.com/quanghuy1242";
  twitterUrl: string = "https://twitter.com/quanghuy1242";

  repos: Observable<any[]>;

  constructor(
    private titleService: Title,
    private repoService: RepoService
    ) { }

  ngOnInit() {
    this.titleService.setTitle('About me');
    this.repos = this.repoService.getRepos();
  }

  openLink(url: string): void {
    window.open(url, "_blank");
  }
}
