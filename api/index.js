const puppeteer = require("puppeteer");
const { send } = require("micro");

module.exports = async (req, res) => {
  try {
    const url = new URL(
      `http://${req.headers.host}${req.url}`
    ).searchParams.get("url");
    const screenshot = await getScreenshot({ url: url });
    res.setHeader("Content-Type", `image/png; charset=utf-8`);
    send(res, 200, screenshot);
  } catch {
    send(res, 500);
  }
};

async function getScreenshot({ url }) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    executablePath: "/usr/bin/google-chrome"
  });
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({
    fullPage: true
  });
  await browser.close();
  return screenshot;
}
