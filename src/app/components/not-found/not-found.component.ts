import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
  	private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
  	this.setMetaData({
  		title: 'Not Found',
  		description: 'Không tìm thấy trang này',
  		image: 'https://raw.githubusercontent.com/quanghuy1242/MyLibary/master/images/cover2.jpg',
  	});
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
    this.meta.updateTag({ 'property': 'og:url', 'content': `https://quanghuy.netlify.com/404` });
    this.meta.updateTag({ 'property': 'og:image', 'content': data.image });
    this.meta.updateTag({ 'property': 'og:image:alt', 'content': data.title });
    this.meta.updateTag({ 'property': 'og:description', 'content': data.description });
  }

}
