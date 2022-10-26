import { test, expect } from "@playwright/test";

test("Home page redirects to login if user is not", async ({ page }) => {
    await page.goto("http://localhost:3000/home");
    await page.waitForSelector("text=Iniciar");
    expect(page.url()).toBe("http://localhost:3000/login");
});

test("Search page redirects to login if user is not", async ({ page }) => {
    await page.goto("http://localhost:3000/search");
    await page.waitForSelector("text=Iniciar");
    expect(page.url()).toBe("http://localhost:3000/login");
});
