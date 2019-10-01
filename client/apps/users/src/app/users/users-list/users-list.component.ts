import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '@client/core-data';

@Component({
  selector: 'client-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: User[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  selectUser(user: User) {
    this.selected.emit(user);
  }

  deleteUser(userId: number, event: any) {
    event.stopImmediatePropagation();
    this.deleted.emit(userId);
  }
}
