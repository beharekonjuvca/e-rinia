const {
  Given,
  When,
  Then,
  setDefaultTimeout,
  AfterAll,
} = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
setDefaultTimeout(20000);

Given("I am on the organization login page", async function () {
  this.driver = await new Builder().forBrowser("chrome").build();
  await this.driver.get("http://localhost:5173/organization/login");
});

When("I log in as an organization", async function () {
  await this.driver
    .findElement(By.name("email"))
    .sendKeys("behare.konjuvca@gmail.com");
  await this.driver.findElement(By.name("password")).sendKeys("123");
  await this.driver.findElement(By.css('button[type="submit"]')).click();
  await this.driver.wait(until.urlContains("organization/events"), 10000);
  const currentUrl = await this.driver.getCurrentUrl();
  assert(currentUrl.includes("organization/events"), "Not on the events page");
});

Given("I am on the events page", async function () {
  const currentUrl = await this.driver.getCurrentUrl();
  assert(
    currentUrl.includes("organization/events"),
    "Not on the events page after login"
  );
});

When("I fill out the event form and submit", async function () {
  const addButton = await this.driver.wait(
    until.elementLocated(By.css("#AddEvent")),
    10000
  );
  await this.driver.wait(until.elementIsVisible(addButton), 10000);
  await addButton.click();
  const modal = await this.driver.wait(
    until.elementLocated(By.css(".ant-modal")),
    10000
  );
  await this.driver.wait(until.elementIsVisible(modal), 10000);
  const jsSetDate = `document.querySelector('#date').value='2024-12-31T10:00';`;
  await this.driver.executeScript(jsSetDate);
  await this.driver.findElement(By.css("#name")).sendKeys("Test Event");
  await this.driver.findElement(By.css("#place")).sendKeys("Test Place");
  await this.driver.findElement(By.css("#date")).click();
  const datePickerPanel = await this.driver.wait(
    until.elementLocated(By.css(".ant-picker-panel")),
    10000
  );
  await this.driver.wait(until.elementIsVisible(datePickerPanel), 10000);
  await this.driver.findElement(By.css(".ant-picker-year-btn")).click();
  const yearToSelect = await this.driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'ant-picker-year-panel')]//td[contains(text(),'2024')]"
      )
    ),
    10000
  );
  await yearToSelect.click();

  await this.driver.findElement(By.css(".ant-picker-month-btn")).click();
  const monthToSelect = await this.driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'ant-picker-month-panel')]//td[contains(text(),'Dec')]"
      )
    ),
    10000
  );
  await monthToSelect.click();
  const dayToSelect = await this.driver.wait(
    until.elementLocated(
      By.css('.ant-picker-cell-inner[data-date="2024-12-31"]')
    ),
    10000
  );
  await dayToSelect.click();

  await this.driver
    .findElement(By.css("#description"))
    .sendKeys("Test Description");
  await this.driver.findElement(By.css(".ant-modal .ant-btn-primary")).click();
});

Then("I should see the new event in the events list", async function () {
  await this.driver.wait(until.elementLocated(By.css(".events-list")), 10000);
  const eventsList = await this.driver.findElement(By.css(".events-list"));
  const event = await eventsList.findElement(
    By.xpath("//td[contains(text(), 'Test Event')]")
  );
  assert.ok(event, "New event was not found in the events list.");
});

AfterAll(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
