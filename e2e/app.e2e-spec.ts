import { TakeHomePayPage } from './app.po';

describe('take-home-pay App', () => {
  let page: TakeHomePayPage;

  beforeEach(() => {
    page = new TakeHomePayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
