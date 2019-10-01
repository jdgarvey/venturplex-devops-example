import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UsersService } from './users/users.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [UsersService]
})
export class CoreDataModule {}
