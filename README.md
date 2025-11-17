# 🎭 Playwright Test Automation Framework


[![GitHub followers](https://img.shields.io/github/followers/SlavenaGGancheva?style=social)](https://github.com/SlavenaGGancheva)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Slavena%20Gancheva-blue?logo=linkedin)](https://www.linkedin.com/in/slavena-gancheva-5484b02a2)

End-to-end UI test automation framework for [saucedemo.com](https://www.saucedemo.com/) built with **Playwright** and **JavaScript**, following the **Page Object Model** and organized into clear, business-oriented test suites (Login, Products, Cart, Checkout).

This project is part of my QA Automation portfolio and showcases how I design, structure, and implement automated tests for a modern web application.

---

## 🔍 Highlights

- ✅ **Real website**: `https://www.saucedemo.com/`
- ✅ **Playwright Test + JavaScript (ESM)**
- ✅ **Page Object Model (POM)** for maintainability
- ✅ **Cross-browser** execution (Chromium, Firefox, WebKit)
- ✅ **Data-driven tests** (login & form validation scenarios)
- ✅ **End-to-end checkout flows** (single & multiple products)
- ✅ **UI & functional coverage** for login, products, cart, checkout
- ✅ **HTML test report**, traces on retry, screenshots on failure

---

## 🧰 Tech Stack

- **Language:** JavaScript (ESM)
- **Test Runner:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Libraries & Tools:**
  - `@playwright/test`
  - `@faker-js/faker` for realistic test data
- **Browsers:** Chromium, Firefox, WebKit
- **Reporting & Debugging:** HTML reporter, Playwright Trace Viewer, screenshots on failure

---

## 🧱 Project Structure

```text
playwright-automation/
  ├─ page-objects/
  │   ├─ CartPage.js
  │   ├─ CheckoutCompletePage.js
  │   ├─ CheckoutInformationPage.js
  │   ├─ CheckoutOverviewPage.js
  │   ├─ LoginPage.js
  │   └─ ProductsPage.js
  │
  ├─ tests/
  │   ├─ login/
  │   │   ├─ login.positive.spec.js
  │   │   └─ login.negative.spec.js
  │   │
  │   ├─ products/
  │   │   ├─ products.ui.spec.js
  │   │   ├─ products.add-remove.spec.js
  │   │   └─ products.sorting.spec.js
  │   │
  │   ├─ cart/
  │   │   ├─ cart.empty.spec.js
  │   │   ├─ cart.items.spec.js
  │   │   └─ cart.navigation-persistence.spec.js
  │   │
  │   └─ checkout/
  │       ├─ checkout.information.spec.js
  │       ├─ checkout.overview.spec.js
  │       └─ checkout.flow.spec.js
  │
  ├─ testData/
  │   ├─ users.json
  │   ├─ loginErrorMessages.json
  │   └─ checkoutValidationMessages.json
  │
  ├─ playwright.config.js
  └─ package.json
