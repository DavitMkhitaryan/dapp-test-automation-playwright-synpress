# Test Automation Project Example for Web3 Decentralized Applications with Playwright and Synpress 🎭

This is a demo project to showcase a test automation project structure and architecture for a Decentralized Web3 App using Playwright and Synpress as a plugin. You can find more info about Synpress here: https://github.com/Synthetixio/synpress.

- System under test link: https://dapp-citizen-react.vercel.app/
- Source code of the system under test: https://github.com/DavitMkhitaryan/dapp-citizen-react

Running instructions:
1. Run `npm install`
2. Add a `.env` file with all necessary values (see `.env.example`)
  - ENVIRONMENT_URL=https://dapp-citizen-react.vercel.app (Dapp under test link, leave as it is)
  - METAMASK_SETUP_KEY=YOUR_METAMASK_ACCOUNTS_PRIVATE_KEY (use the private key of the metamask account which you wish to use inside the tests)
  - METAMASK_SETUP_NETWORK=sepolia (Dapp under tests works on sepolia network so leave as it is)
  - METAMASK_SETUP_PASSWORD=METAMASK_ACCOUNT_PASSWORD (You can use any value here, it will be used during Metamask wallet setup in automation tests)
3. Run `npm test` to run tests in headless mode and `npm run test:headed` to run tests in headed mode. (Usual Playwright methods to run tests in headless or headed mode are not used here as in case of Synpress integration, this is controlled from "pomSynpressFixture.ts" and not from the playwright config file as usual, so environment variable is used to control the headless/headed mode)
4. Run  `npx playwright show-report test-report` to view the test report