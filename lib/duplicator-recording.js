const puppeteer = require("puppeteer");
const { waitForArchiveDownload, moveInstallerFiles } = require("./utils");
const { delay } = require("puppeteer-utilz");

module.exports = async function duplicatorRecording(options) {
  const browser = await puppeteer.launch({ headless: !options.debug });
  const page = await browser.newPage();
  const timeout = 1.8e6; // 30 minutes
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1905,
      height: 741,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await targetPage.goto(
      `${options.upstreamUrl}/wp-admin/admin.php?page=duplicator-pro`
    );
    await Promise.all(promises);
  }
  console.log("Logging in...");
  {
    const targetPage = page;
    const element = await waitForSelectors([["#user_login"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 77.5,
        y: 20,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors([["#user_login"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.type(options.username);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors([["#user_pass"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 40.5,
        y: 14,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors([["#user_pass"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.type(options.password);
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors([["#wp-submit"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 23.984375,
        y: 10,
      },
    });
    await Promise.all(promises);
  }
  console.log("Logged in successfully.");
  console.log("Initializing Duplicator Pro package creation...");
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [["#dup-pro-create-new"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 43.34375,
        y: 17.609375,
      },
    });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["#dup-pack-archive-panel #export-onlydb"]],
      targetPage,
      { timeout }
    );
    await page.evaluate((options) => {
      const checkbox = document.querySelector(
        "#dup-pack-archive-panel #export-onlydb"
      );
      if (options.dbOnly) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }, options);
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors([["#button-next"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 17,
        y: 18.265625,
      },
    });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [["#dup-build-button"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 69.484375,
        y: 24.515625,
      },
    });
    await Promise.all(promises);
  }
  console.log("Building duplicator package...");
  {
    const targetPage = page;
    await scrollIntoViewIfNeeded(
      [[".dup-packtbl tbody > tr:first-child button.dup-dnload-btn span"]],
      targetPage,
      timeout
    );
    const element = await waitForSelectors(
      [[".dup-packtbl tbody > tr:first-child button.dup-dnload-btn span"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 12,
        y: 3.609375,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [[".dup-packtbl tbody > tr:first-child button.dup-dnload-archive"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click();
  }
  await delay(3);
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["#wpbody-content > div.wrap > h1"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 39,
        y: 30,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [[".dup-packtbl tbody > tr:first-child button.dup-dnload-btn span"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 12,
        y: 3.609375,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [[".dup-packtbl tbody > tr:first-child button.dup-dnload-installer"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click();
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["#wpbody-content > div.wrap > h1"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 39,
        y: 30,
      },
    });
  }
  console.log("Waiting for package download to finish...");
  await waitForArchiveDownload();
  await moveInstallerFiles(options.localSiteName);
  console.log("Starting local installation...");
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await targetPage.goto(`${options.downstreamUrl}/installer.php`);
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["#s2-db-basic-overwrite > div.btn-area > input:nth-child(1)"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 31.125,
        y: 13.015625,
      },
    });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors([["#validate-button"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 37.578125,
        y: 17.015625,
      },
    });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [["#wrapper_item_accept-warnings > label > span > span"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 118.875,
        y: 9.265625,
      },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors([["#s1-deploy-btn"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 27.5,
        y: 11.515625,
      },
    });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [["#db-install-dialog-confirm-button"]],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 33.15625,
        y: 16.546875,
      },
    });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors([["#s4-final-btn"]], targetPage, {
      timeout,
      visible: true,
    });
    await element.click({
      offset: {
        x: 101.5,
        y: 15,
      },
    });
  }
  console.log("Clone completed successfully!");

  await browser.close();

  async function waitForSelectors(selectors, frame, options) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame, options);
      } catch (err) {
        console.error(err);
      }
    }
    throw new Error(
      "Could not find element for selectors: " + JSON.stringify(selectors)
    );
  }

  async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
    const element = await waitForSelectors(selectors, frame, {
      visible: false,
      timeout,
    });
    if (!element) {
      throw new Error("The element could not be found.");
    }
    await waitForConnected(element, timeout);
    const isInViewport = await element.isIntersectingViewport({ threshold: 0 });
    if (isInViewport) {
      return;
    }
    await element.evaluate((element) => {
      element.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    });
    await waitForInViewport(element, timeout);
  }

  async function waitForConnected(element, timeout) {
    await waitForFunction(async () => {
      return await element.getProperty("isConnected");
    }, timeout);
  }

  async function waitForInViewport(element, timeout) {
    await waitForFunction(async () => {
      return await element.isIntersectingViewport({ threshold: 0 });
    }, timeout);
  }

  async function waitForSelector(selector, frame, options) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error("Empty selector provided to waitForSelector");
    }
    let element = null;
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (element) {
        element = await element.waitForSelector(part, options);
      } else {
        element = await frame.waitForSelector(part, options);
      }
      if (!element) {
        throw new Error("Could not find element: " + selector.join(">>"));
      }
      if (i < selector.length - 1) {
        element = (
          await element.evaluateHandle((el) =>
            el.shadowRoot ? el.shadowRoot : el
          )
        ).asElement();
      }
    }
    if (!element) {
      throw new Error("Could not find element: " + selector.join("|"));
    }
    return element;
  }

  async function waitForElement(step, frame, timeout) {
    const count = step.count || 1;
    const operator = step.operator || ">=";
    const comp = {
      "==": (a, b) => a === b,
      ">=": (a, b) => a >= b,
      "<=": (a, b) => a <= b,
    };
    const compFn = comp[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      return compFn(elements.length, count);
    }, timeout);
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error("Empty selector provided to querySelectorAll");
    }
    let elements = [];
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (i === 0) {
        elements = await frame.$$(part);
      } else {
        const tmpElements = elements;
        elements = [];
        for (const el of tmpElements) {
          elements.push(...(await el.$$(part)));
        }
      }
      if (elements.length === 0) {
        return [];
      }
      if (i < selector.length - 1) {
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (
            await el.evaluateHandle((el) =>
              el.shadowRoot ? el.shadowRoot : el
            )
          ).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
      }
    }
    return elements;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    const timeoutId = setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        clearTimeout(timeoutId);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Timed out");
  }

  async function changeSelectElement(element, value) {
    await element.select(value);
    await element.evaluateHandle((e) => {
      e.blur();
      e.focus();
    });
  }

  async function changeElementValue(element, value) {
    await element.focus();
    await element.evaluate((input, value) => {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
  }

  async function typeIntoElement(element, value) {
    const textToType = await element.evaluate((input, newValue) => {
      if (
        newValue.length <= input.value.length ||
        !newValue.startsWith(input.value)
      ) {
        input.value = "";
        return newValue;
      }
      const originalValue = input.value;
      input.value = "";
      input.value = originalValue;
      return newValue.substring(originalValue.length);
    }, value);
    await element.type(textToType);
  }
};
