import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderTitleComponent } from './header-title/header-title.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { AboutComponent } from './about/about.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentComponent } from './comment/comment.component';
import { ButtonShareMenuComponent } from './button-share-menu/button-share-menu.component';
import { CommentSubmitComponent } from './comment-submit/comment-submit.component';
import { LoginComponent } from './login/login.component';

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
    AboutComponent,
    SideNavComponent,
    NotFoundComponent,
    CommentItemComponent,
    CommentComponent,
    ButtonShareMenuComponent,
    CommentSubmitComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
