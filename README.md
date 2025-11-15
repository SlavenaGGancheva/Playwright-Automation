# 🎭 Playwright Test Automation Framework

This project is a UI automation framework built with [Playwright](https://playwright.dev/) and JavaScript
to test the e-commerce demo site https://www.saucedemo.com.

It is designed to simulate a real-world QA Automation Engineer workflow:
- Page Object Model
- Data-driven tests
- Positive & negative scenarios
- CI pipeline (GitHub Actions)
- HTML reports & screenshots on failure

## Tech Stack

- Playwright Test (JavaScript)
- Node.js
- GitHub Actions (CI)
- Allure Report / Playwright HTML report
- Faker.js for test data

## Test Coverage

**Login**
- Valid login for standard user
- Negative scenarios:
  - Locked-out user
  - Invalid username/password
  - Empty username/password
- Error message validation

**Products Page**
- Products are displayed with name, price, and image
- Sorting: A→Z, Z→A, Price low→high, high→low
- Add/remove products from cart
- Cart icon badge count

**Cart**
- Empty cart behavior
- Remove items from cart
- Cart summary validation

**Checkout**
- All fields required on information page (first name, last name, ZIP)
- Error messages for missing fields
- Successful checkout flow:
  - Add item → Cart → Checkout → Overview → Finish
  - Verify item details, subtotal, tax, total
  - Order confirmation page
  - “Back Home” returns to Products and clears cart


## Project Structure