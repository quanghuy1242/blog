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
  MatSidenavModule
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
    MatSidenavModule
  ]
})

export class MaterialModule {}