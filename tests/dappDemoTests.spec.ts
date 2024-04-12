import { test, expect } from "../fixtures/pomSynpressFixture";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import { citizenData, expectedValues } from "../testData/dappDemoTestsData";

test.describe("Dapp Demo Tests", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.connectWallet();
  });

  test("Connecting Wallet to the application is successful", async ({
    homePage,
  }) => {
    const connectedWalletAddress = await homePage.getConnectedWalletAddress();
    const connectedAddressMetamask = await metamask.getWalletAddress();
    expect(connectedAddressMetamask).toEqual(connectedWalletAddress);
    await expect(homePage.btnConnect).not.toBeVisible();
    await expect(homePage.textWalletNotConnected).not.toBeVisible();
    await expect(homePage.btnAddCitizenHeader).toBeVisible();
    expect(await homePage.getAddCitizenHeaderButtonText()).toEqual(
      expectedValues.addCitizenButtonTextExpected
    );
    expect(await homePage.getTotalRecordsCount()).not.toEqual(0);
    await expect(homePage.tableCitizens).toBeVisible();
  });

  test("Disconnecting Wallet from the application is successful", async ({
    homePage,
  }) => {
    await metamask.disconnectWalletFromDapp();
    await expect(homePage.btnAddCitizenHeader).not.toBeVisible();
    await expect(homePage.tableCitizens).not.toBeVisible();
    await expect(homePage.btnConnect).toBeVisible();
    expect(await homePage.getConnectButtonText()).toEqual(
      expectedValues.connectButtonTextExpected
    );
    expect(await homePage.getTotalRecordsCount()).toEqual(0);
    await expect(homePage.textWalletNotConnected).toBeVisible();
    expect(await homePage.getWalletNotConnectedText()).toEqual(
      expectedValues.walletNotConnectedTextExpected
    );
  });

  test("Adding new citizen is successful", async ({
    homePage,
    addCitizenPage,
  }) => {
    const totalCountBefore = await homePage.getTotalRecordsCount();
    await homePage.btnAddCitizenHeader.click();
    await addCitizenPage.addCitizen(citizenData);
    await expect(addCitizenPage.msgCitizenAddedSuccess).toBeVisible({
      timeout: 60000,
    });
    await homePage.navigate();
    await homePage.page.waitForSelector("[data-testid='citizenRow-1']");
    const totalCountAfter = await homePage.getTotalRecordsCount();
    expect(totalCountAfter).toBeGreaterThan(totalCountBefore);
  });
});
