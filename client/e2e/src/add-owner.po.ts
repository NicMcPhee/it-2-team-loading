import { browser, by, element } from 'protractor';

export interface TestOwner {
  name: string;
  officeID: string;
  building: string;
  email: string;
}

export class AddOwnerPage {
  navigateTo() {
    return browser.get('/owners/new');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    const title = element(by.className('add-owner-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    const sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  clickAddOwner() {
    return element(by.buttonText('ADD OWNER')).click();
  }

  async addOwner(newOwner: TestOwner) {
    await this.typeInput('nameField', newOwner.name);
    await this.typeInput('officeIDField', newOwner.officeID);
    await this.typeInput('buildingField', newOwner.building);
    await this.typeInput('emailField', newOwner.email);
    return this.clickAddOwner();
  }
}
