import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryModule } from './category/category.module';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    HeaderTitleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    HomeModule,
    CategoryModule,
    PostModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
