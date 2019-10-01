import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
}  from  '@angular/material';

const MODULES = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule {}
