import { NgModule } from '@angular/core';
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
  MatTabsModule
} from '@angular/material'

@NgModule({
  exports: [
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
    MatTabsModule
  ]
})

export class MaterialModule {}