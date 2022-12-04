import { test, expect, devices } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test.use({
    ...devices["iPhone 11"],
    ...devices["Pixel 5"],
});

test.describe.configure({ mode: "serial" });

const picture = fs.readFileSync(path.join(__dirname, "/zanahorias.jpg"));

test("test", async ({ page }) => {
    const id = Math.floor(Math.random() * 100);
    await page.goto("http://localhost:3000/");
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("name@company.com").click();
    await page.getByPlaceholder("name@company.com").fill("alba@email.com");
    await page.getByPlaceholder("name@company.com").press("Tab");
    await page.getByPlaceholder("••••••••").fill("123456789");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await expect(page).toHaveURL("http://localhost:3000/home");
    await page.locator(".MuiPaper-root > div > div:nth-child(2)").click();
    await expect(page).toHaveURL("http://localhost:3000/newproduct");
    const [fileChooser] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.getByRole("button", { name: "+" }).click(),
    ]);
    await page.getByPlaceholder("Nombre del producto").click();
    await page.getByPlaceholder("Nombre del producto").fill("Zanahoria" + id);
    await page.getByPlaceholder("-").click();
    await page.getByPlaceholder("-").fill("2");
    await page.getByPlaceholder("Descripción").click();
    await page.getByPlaceholder("Descripción").fill("Zanahoria rica");
    await fileChooser.setFiles({
        name: "zanahorias.jpg",
        mimeType: "image/jpeg",
        buffer: picture,
    });

    await page.getByRole("button", { name: "Subir" }).click();
    await expect(page).toHaveURL("http://localhost:3000/home");
    await page.locator(".MuiPaper-root > div > div:nth-child(3)").click();
    await expect(page).toHaveURL(
        "http://localhost:3000/seller/637dd4d672ca6c26516c25ed"
    );
    await page.getByText("Zanahoria" + id).click();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Editar" }).click();
    await page.waitForLoadState("networkidle");
    expect(await page.locator('textarea[name="name"]').inputValue()).toBe(
        "Zanahoria" + id
    );
    expect(
        await page.locator('textarea[name="pricePerKilogram"]').inputValue()
    ).toBe("2");
    expect(
        await page.locator('textarea[name="description"]').inputValue()
    ).toBe("Zanahoria rica");
    await page.locator("#delete").click();
    await page.waitForLoadState("networkidle");
});
