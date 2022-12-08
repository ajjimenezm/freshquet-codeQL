import { test, expect, devices } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test.use({
    ...devices["iPhone 11"],
    ...devices["Pixel 5"],
});

test.describe.configure({ mode: "serial" });

const picture = fs.readFileSync(path.join(__dirname, "/zanahorias.jpg"));

test("Upload and delete product", async ({ page }) => {
    const id = Math.floor(Math.random() * 100000);
    const price = Math.floor(Math.random() * 100);
    await page.goto("http://localhost:3000/");
    await page.goto("http://localhost:3000/login");
    await page.locator("#username").click();
    await page.locator("#username").fill("alba@email.com");
    await page.locator("#username").click();
    await page.locator("#password").fill("123456789");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await page.locator(".MuiPaper-root > div > div:nth-child(2)").click();
    await expect(page).toHaveURL("http://localhost:3000/newproduct");
    const [fileChooser] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.getByRole("button", { name: "+" }).click(),
    ]);
    await page.locator("#name").click();
    await page.locator("#name").fill("Zanahoria" + id);
    await page.locator("#quantity-field").click();
    await page.locator("#quantity-field").fill(price.toString());
    await page.locator("#description").click();
    await page.locator("#description").fill("Zanahoria rica");
    await fileChooser.setFiles({
        name: "zanahorias.jpg",
        mimeType: "image/jpeg",
        buffer: picture,
    });

    await page.getByRole("button", { name: "Subir" }).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".MuiPaper-root > div > div:nth-child(3)").click();
    await page.waitForLoadState("networkidle");
    await page.locator("#Zanahoria" + id).click();
    await page.waitForLoadState("networkidle");
    expect(await page.locator("#name").inputValue()).toBe("Zanahoria" + id);
    expect(await page.locator("#quantity-field").inputValue()).toBe(
        price.toString()
    );
    await page.locator("#delete").click();
    await page.waitForLoadState("networkidle");
});
