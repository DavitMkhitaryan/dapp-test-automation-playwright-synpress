import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { initialSetup } from "@synthetixio/synpress/commands/metamask";
import { prepareMetamask } from "@synthetixio/synpress/helpers";
import { setExpectInstance } from "@synthetixio/synpress/commands/playwright";
import { resetState } from "@synthetixio/synpress/commands/synpress";
import dotenv from "dotenv";
import HomePage from "../pages/home.page";
import AddCitizenPage from "../pages/addCitizen.page";
dotenv.config();

interface Page {
  context: BrowserContext;
  homePage: HomePage;
  addCitizenPage: AddCitizenPage;
}

export const test = base.extend<Page>({
  context: async ({}, use) => {
    // required for synpress as it shares same expect instance as playwright
    await setExpectInstance(expect);
    // download metamask
    const metamaskPath: string = await prepareMetamask(
      process.env.METAMASK_VERSION != null || "10.25.0"
    );
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      "--remote-debugging-port=9222",
    ];
    if (process.env.CI != null) {
      browserArgs.push("--disable-gpu");
    }
    if (process.env.HEADLESS_MODE === "true") {
      browserArgs.push("--headless=new");
    }
    // launch browser
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
    });
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: process.env.METAMASK_SETUP_PRIVATE_KEY,
      network: process.env.METAMASK_SETUP_NETWORK,
      password: process.env.METAMASK_SETUP_PASSWORD,
      enableAdvancedSettings: true,
      enableExperimentalSettings: false,
    });
    await use(context);
    await context.close();
    await resetState();
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  addCitizenPage: async ({ page }, use) => {
    await use(new AddCitizenPage(page));
  },
});

export const expect = test.expect;
