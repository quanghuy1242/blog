import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  currentUrl: string;
  routeHideSideBar = [
    '/login', 
    '/register',
    '/404'
  ];
  hideSideBar: boolean = true;

  private _mobileQueryListener: () => void

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher, 
    public location: Location,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.hideShowSideBar();
  }

  hideShowSideBar(): void {
    if (!this.mobileQuery.matches) {
      this.router.events.subscribe(event => {
        this.hideSideBar = false;
        this.routeHideSideBar.forEach(route => {
          if (route === this.location.path()) {
            this.hideSideBar = true;
          }
        })
      })
    }
  }
}
