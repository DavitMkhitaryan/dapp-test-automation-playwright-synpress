import { type Page, type Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class HomePage extends BasePage {
  readonly path: string;
  readonly textWalletNotConnected: Locator;
  readonly tableCitizens: Locator;
  readonly textTotalRecordsCount: Locator;

  constructor(page: Page) {
    super(page);
    this.path = "/";

    // Locators
    this.textWalletNotConnected = this.page.getByTestId(
      "walletNotConnectedText"
    );
    this.tableCitizens = this.page.getByTestId("citizensTable");
    this.textTotalRecordsCount = this.page.getByTestId("totalRecordsCount");
  }

  async navigate(): Promise<void> {
    await super.navigate(this.path);
  }

  async getWalletNotConnectedText(): Promise<string> {
    const text = (await this.textWalletNotConnected.textContent()) as string;
    return text;
  }

  async getTotalRecordsCount(): Promise<number | null> {
    const countText = await this.textTotalRecordsCount.textContent();
    if (countText === "N/A") {
      return null;
    }
    const count = Number(countText);
    return count;
  }
}
