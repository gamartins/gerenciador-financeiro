import { GerenciadorFinanceiroPage } from './app.po';

describe('gerenciador-financeiro App', () => {
  let page: GerenciadorFinanceiroPage;

  beforeEach(() => {
    page = new GerenciadorFinanceiroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
