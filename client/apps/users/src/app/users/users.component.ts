import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { UsersService, User } from '@client/core-data';

@Component({
  selector: 'client-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  user: User;
  users$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.initForm();
  }

  select(user: User) {
    this.user = user;
    this.form.patchValue(user);
  }

  getUsers() {
    this.users$ = this.usersService.all();
  }

  save(user: User) {
    if (user.id) {
      this.usersService.update(user).subscribe(res => this.mutationResponse());
      return;
    }
    this.usersService.create(user).subscribe(res => this.mutationResponse());
  }

  deleteUser(userId: number) {
    this.usersService.delete(userId).subscribe(res => this.mutationResponse());
  }

  reset() {
    this.form.reset();
  }

  private mutationResponse() {
    this.getUsers();
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
    });
  }

}
