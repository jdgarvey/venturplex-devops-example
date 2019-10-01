import { Component } from '@angular/core';

@Component({
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'users';
  links = [{path: '/users', icon: 'people', label: 'USERS'}];
}
