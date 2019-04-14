import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './components/blog/blog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ButtonShareMenuComponent } from './components/button-share-menu/button-share-menu.component';
import { DialogWelcomeComponent } from './components/dialog-welcome/dialog-welcome.component';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { HighlightCodeDirective } from './directives/highlight-code.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';

@NgModule({
  declarations: [
    BlogComponent,
    NavigationComponent,
    BlogDetailComponent,
    FooterComponent,
    CopyClipboardDirective,
    SideNavComponent,
    ButtonShareMenuComponent,
    DialogWelcomeComponent,
    SafeHtmlPipe,
    HighlightCodeDirective,
    DialogInfoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    BlogComponent,
    NavigationComponent,
    BlogDetailComponent,
    FooterComponent,
    CopyClipboardDirective,
    SideNavComponent,
    ButtonShareMenuComponent,
    DialogWelcomeComponent,
    SafeHtmlPipe,
    HighlightCodeDirective,
    DialogInfoComponent
  ],
  entryComponents: [
    DialogWelcomeComponent
  ],
  providers: [
    Title,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ]
})
export class SharedModule { }
