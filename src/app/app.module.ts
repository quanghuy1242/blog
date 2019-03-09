import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderTitleComponent } from './header-title/header-title.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderTitleComponent,
    BlogComponent,
    BlogDetailComponent,
    SideBarComponent,
    FooterComponent,
    HomeComponent,
    BlogPageComponent,
    CopyClipboardDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
