import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatGridListModule,
  MatCardModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTabsModule,
  MatTreeModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  exports: [
    CdkTreeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule
  ]
})

export class MaterialModule {}
