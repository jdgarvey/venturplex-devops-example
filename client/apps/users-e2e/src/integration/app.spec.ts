import { getGreeting } from '../support/app.po';

describe('users', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to users!');
  });
});
