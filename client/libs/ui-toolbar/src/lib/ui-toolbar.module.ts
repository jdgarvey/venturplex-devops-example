import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@client/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class UiToolbarModule {}
