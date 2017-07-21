import { HuddlePage } from './app.po';

describe('huddle App', () => {
  let page: HuddlePage;

  beforeEach(() => {
    page = new HuddlePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
