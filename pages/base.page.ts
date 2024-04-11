import { type Page, type Locator } from "@playwright/test";
import dotenv from "dotenv";
import * as metamask from "@synthetixio/synpress/commands/metamask";
dotenv.config();

export default class BasePage {
  readonly page: Page;
  readonly btnConnect: Locator;
  readonly textConnectedAddress: Locator;
  readonly btnAddCitizenHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.btnConnect = this.page.getByTestId("header-connectButton");
    this.textConnectedAddress = this.page.getByTestId(
      "header-connectedAccountAddress"
    );
    this.btnAddCitizenHeader = this.page.getByTestId("header-addCitizenButton");
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async connectWallet(): Promise<void> {
    await this.btnConnect.click();
    await metamask.acceptAccess();
  }

  async getConnectedWalletAddress(): Promise<string> {
    const walletAddress =
      (await this.textConnectedAddress.textContent()) as string;
    return walletAddress;
  }

  async getConnectButtonText(): Promise<string> {
    const buttonText = (await this.btnConnect
      .locator("p")
      .textContent()) as string;
    return buttonText;
  }

  async getAddCitizenHeaderButtonText(): Promise<string> {
    const buttonText = (await this.btnAddCitizenHeader
      .locator("p")
      .textContent()) as string;
    return buttonText;
  }
}
