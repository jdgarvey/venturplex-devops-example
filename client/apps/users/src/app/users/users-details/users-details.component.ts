import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';
import { User } from '@client/core-data';

@Component({
  selector: 'client-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent {
  selectedUser: User;
  @Input() group: FormGroup;
  @Input() set user(value: User) {
    this.selectedUser = Object.assign({}, value);
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  saveUser(user: User, directive: NgForm) {
    this.saved.emit(user);
    directive.resetForm();
  }

  cancel() {
    this.cancelled.emit();
  }

  determineIfUpdate() {
    return !!this.group.value.id;
  }

  displayError(control: string, errorType: string) {
    return this.group.get(control).hasError(errorType);
  }
}
