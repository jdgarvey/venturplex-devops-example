/// <reference path="../../../typings.d.ts" />

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './user.model';

// const BASE_URL = `${process.env.ENDPOINT}:8080/api/v1`;
const BASE_URL = `http://ade38dec3e93a11e991f20a957bcd771-752365677.us-west-2.elb.amazonaws.com:8080/api/v1`;
const model = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.getUrl());
  }

  findOne(userId: number): Observable<User> {
    return this.httpClient.get<User>(this.getUrlWithId(userId));
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.getUrl(), user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>(this.getUrlWithId(user.id), user);
  }

  delete(userId: number): Observable<unknown> {
    return this.httpClient.delete(this.getUrlWithId(userId));
  }

  private getUrl() {
    return `${BASE_URL}/${model}`;
  }

  private getUrlWithId(userId: number) {
    return `${this.getUrl()}/${userId}`;
  }
}
