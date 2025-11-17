# 🎭 Playwright Test Automation Framework


[![GitHub followers](https://img.shields.io/github/followers/SlavenaGGancheva?style=social)](https://github.com/SlavenaGGancheva)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Slavena%20Gancheva-blue?logo=linkedin)](https://www.linkedin.com/in/slavena-gancheva-5484b02a2)

End-to-end UI test automation framework for [saucedemo.com](https://www.saucedemo.com/) built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** and structured into clean, feature-focused test suites.

This project demonstrates how I design, build, and organize UI automation for a modern web application — with maintainability, clarity, and real-world scalability in mind.

---

## 🔍 Highlights

- 🚀 **Web app** under test: `https://www.saucedemo.com/`
- 🧪 **Playwright Test** with JavaScript (ESM)
- 🧱 **Page Object Model (POM)** for reusable clean architecture
- 🌐 **Cross-browser** testing (Chromium, Firefox, WebKit)
- 🔄 **Data-driven tests** for login & validation flows
- ✔️ **End-to-end checkout journey** (single + multiple items)
- 📊 **HTML report**, traces on retry, screenshots on failure
- 🧩 **Robust locator strategy** using roles + test IDs
- 🗂️ **Clear folder/test suite organization**

---

## 🧰 Tech Stack

| Category | Tools |
|---------|-------|
| **Language** | JavaScript (ESM) |
| **Automation Framework** | Playwright Test |
| **Design Pattern** | Page Object Model |
| **Data Generation** | @faker-js/faker |
| **Browsers** | Chromium, Firefox, WebKit |
| **Reporting** | Built-in HTML Reporter, Trace Viewer |
| **Selectors** | getByRole, getByTestId, getByText |

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
```
---

## 🧪 Test Coverage

### 🔐 Login

**Files:**  
`tests/login/login.positive.spec.js`  
`tests/login/login.negative.spec.js`

- Successful login with valid standard user.
- Logout flow returns user to Login page.
- Data-driven negative scenarios:
  - Valid username + invalid password
  - Invalid username + valid password
  - Locked out user
  - Empty username
  - Empty password  
- Centralized error message assertions in `LoginPage` page object.

---

### 🛍️ Products Page

**Files:**  
`tests/products/products.ui.spec.js`  
`tests/products/products.add-remove.spec.js`  
`tests/products/products.sorting.spec.js`

**UI checks:**

- Exactly 6 products are displayed.
- Each product shows:
  - Name (non-empty)
  - Price (contains `$`)
  - Description (non-empty)
  - “Add to cart” button visible

**Add / Remove / Badge logic:**

- Add single product → badge count = 1  
- Add multiple products → badge count updates correctly  
- “Add to cart” button changes to **“Remove”** after adding  
- Removing products updates badge and hides it when cart becomes empty  

**Sorting:**

- A → Z (name ascending)  
- Z → A (name descending)  
- Price low → high  
- Price high → low  

Sorting assertions compare UI values with a locally sorted copy of the same data.

---

### 🛒 Cart

**Files:**  
`tests/cart/cart.empty.spec.js`  
`tests/cart/cart.items.spec.js`  
`tests/cart/cart.navigation-persistence.spec.js`

**Empty state:**

- “Your Cart” header visible  
- Quantity and description labels displayed  
- No items rendered  
- No cart badge  
- “Continue Shopping” enabled  

**Items & details:**

- Adding 1 / multiple products shows correct items  
- Removing from Products or Cart page updates cart items  
- Product **name**, **price**, and **description** match between pages  

**Persistence:**

- Cart retains items after:
  - Refresh  
  - Navigation Products ↔ Cart  
  - Navigation Cart ↔ Checkout (cancel)

---

### 🧾 Checkout

#### 1) Checkout Information Page

- Valid information moves user to Checkout Overview  
- Cancel returns user to Cart, keeping products  
- Missing field validation (data-driven):
  - Missing first name  
  - Missing last name  
  - Missing zip/postal code  
- Error disappears after fixing field and resubmitting  

#### 2) Checkout Overview Page

- Payment Information, Shipping, Total sections visible  
- `item total + tax = total`  
- Cancel returns to Products and preserves cart  
- Finish:
  - Confirms order  
  - Displays thank-you message  
  - Clears cart after navigating home  

#### 3) End-to-End Checkout Flow

- Add single or multiple products  
- Products → Cart → Checkout Info → Overview → Complete  
- Faker-generated user data  
- Price sanity checks  
- Order completion and cart reset  

---

## 🧩 Page Object Model (POM)

Each page is represented by a dedicated class in `page-objects/`.

Examples:

- **LoginPage** — login actions + assertions  
- **ProductsPage** — product UI, add/remove, sorting, badge logic  
- **CartPage** — item retrieval, remove buttons, details checks  
- **CheckoutInformationPage** — form actions, validation  
- **CheckoutOverviewPage** — totals, cancel/finish  
- **CheckoutCompletePage** — final confirmation + back home  

Benefits:

- Clean, readable tests  
- Reusable components  
- Maintainable selectors  
- Business-focused test logic  

---

## ⚙️ Playwright Configuration

Key settings in `playwright.config.js`:

- `testDir: './tests'`  
- `fullyParallel: true`  
- `forbidOnly: true`  
- Retries on CI  
- Cross-browser projects (Chromium, Firefox, WebKit)  
- `trace: 'on-first-retry'`  
- `screenshot: 'only-on-failure'`  
- `testIdAttribute: 'data-test'`  
- HTML reporter enabled  

---