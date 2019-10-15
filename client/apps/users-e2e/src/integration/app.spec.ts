import { getGreeting } from '../support/app.po';

describe('users', () => {
  beforeEach(() => cy.visit('/users'));

  it('should display welcome message', () => {
    getGreeting().contains('Users');
  });
});
