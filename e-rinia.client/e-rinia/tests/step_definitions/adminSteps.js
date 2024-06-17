const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
let driver;

async function initializeDriver() {
  if (!driver) {
    driver = await new Builder().forBrowser("chrome").build();
  }
  return driver;
}

Given("I am on the admin login page", async function () {
  driver = await initializeDriver();
  await driver.get("http://localhost:3000/admin-login");
});

When("I login with admin credentials", async function () {
  await driver.findElement(By.id("email")).sendKeys("admin@example.com");
  await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);
});

Then("I should be redirected to the admin dashboard", async function () {
  await driver.wait(
    until.urlIs("http://localhost:3000/admin-dashboard"),
    10000
  );
  const url = await driver.getCurrentUrl();
  assert.strictEqual(url, "http://localhost:3000/admin-dashboard");
});

When("I navigate to the {string} page", async function (pageName) {
  await driver.findElement(By.linkText(pageName)).click();
});

Then("I should see a list of {string}", async function (entity) {
  let elements = await driver.findElements(By.className(`${entity}-list-item`));
  assert(elements.length > 0, `${entity} list is not visible`);
});

When("I fill out and submit the new {string} form", async function (entity) {
  await driver.findElement(By.id(`add-${entity}`)).click();
  await driver.findElement(By.id(`${entity}-name`)).sendKeys("New Name");
  await driver
    .findElement(By.id(`${entity}-email`))
    .sendKeys("email@example.com");
  await driver.findElement(By.css(`#${entity}-submit`)).click();
});

Then(
  "I should see the new {string} in the {string} list",
  async function (entity, list) {
    let elements = await driver.findElements(
      By.xpath(`//div[contains(text(), 'New Name')]`)
    );
    assert(elements.length > 0, `New ${entity} is not in the ${list}`);
  }
);

When(
  "I select a {string} to edit and submit the changes",
  async function (entity) {
    await driver.findElement(By.css(`.edit-${entity}-button`)).click();
    await driver.findElement(By.id(`${entity}-name`)).sendKeys(" Updated");
    await driver.findElement(By.css(`#${entity}-save`)).click();
  }
);

Then(
  "I should see the updated details in the {string} list",
  async function (list) {
    let elements = await driver.findElements(
      By.xpath(`//div[contains(text(), 'Updated')]`)
    );
    assert(elements.length > 0, `Updated details are not visible in ${list}`);
  }
);

When("I delete a {string}", async function (entity) {
  await driver.findElement(By.css(`.delete-${entity}-button`)).click();
});

Then(
  "the {string} should no longer appear in the list",
  async function (entity) {
    let elements = await driver.findElements(
      By.xpath(`//div[contains(text(), 'Deleted Entity Name')]`)
    );
    assert.strictEqual(
      elements.length,
      0,
      `${entity} is still visible after deletion`
    );
  }
);

When("I approve an event", async function () {
  await driver.findElement(By.css(".approve-event-button")).click();
});

Then("the event should be marked as approved in the list", async function () {
  let approved = await driver
    .findElement(By.css(".event-approved-label"))
    .isDisplayed();
  assert(approved, "Event is not marked as approved");
});

When("I click the logout button", async function () {
  await driver.findElement(By.id("logout-button")).click();
});

Then("I should be redirected to the login page", async function () {
  await driver.wait(until.urlIs("http://localhost:3000/login"), 10000);
  const url = await driver.getCurrentUrl();
  assert.strictEqual(url, "http://localhost:3000/login");
});
