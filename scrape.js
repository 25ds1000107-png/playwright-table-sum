const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 51; seed <= 60; seed++) {

    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Visiting:", url);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector("table");

    const sum = await page.evaluate(() => {
      let total = 0;

      const cells = document.querySelectorAll("table td");

      cells.forEach(cell => {
        const number = parseFloat(cell.innerText.trim());
        if (!isNaN(number)) {
          total += number;
        }
      });

      return total;
    });

    console.log(`Seed ${seed} sum:`, sum);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();