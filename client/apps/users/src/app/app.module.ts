import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreDataModule } from '@client/core-data';
import { MaterialModule } from '@client/material';
import { UiToolbarModule } from '@client/ui-toolbar';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersDetailsComponent } from './users/users-details/users-details.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, UsersListComponent, UsersDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDataModule,
    MaterialModule,
    UiToolbarModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
