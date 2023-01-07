import HomePage from '../pages/home-page';
import allureReporter from '@wdio/allure-reporter';

describe('Navigation Menu', () => {
    it('Get the text of all menu items & assert them', async () => {

      allureReporter.addFeature("Navigation");
      allureReporter.addSeverity("critical");

        await HomePage.open();

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
          ];

        const actualLinks = [];

        const navLinks = await HomePage.NavComponent.linksNavMenu;
    
        for (const link of navLinks) {
          actualLinks.push(await link.getText());
        }

        await expect(expectedLinks).toEqual(actualLinks);

    });

    it('Get the text of all menu items & assert them - using wait commands', async () => {
      // hardcoded timeout
      // browser.pause(1000);

      HomePage.open(); //without await
      await $('#primary-menu').waitForDisplayed({timeout: 1000});
      await HomePage.NavComponent.firstNavMenuList.waitForClickable();
      await HomePage.NavComponent.firstNavMenuList.waitForEnabled();
      await HomePage.NavComponent.firstNavMenuList.waitForExist();
      await browser.waitUntil(async function() {
          const homeText = await HomePage.NavComponent.firstNavMenuList.getText();
          return homeText === "Home";
      }, {
          timeout: 2000,
          timeoutMsg: 'Could not verify the Home text'
      });      
  
      const expectedLinks = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account",
      ];
  
      const actualLinks = [];  
     
      const navLinks = await HomePage.NavComponent.linksNavMenu;
  
      for (const link of navLinks) {
        actualLinks.push(await link.getText());
      }
  
      await expect(actualLinks).toEqual(expectedLinks);
    });
});