const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "frontend" });
});

app.post("/generate", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Code input is required.");
    return;
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`<pre><code>${code}</code></pre>`);
    const screenshot = await page.screenshot();

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": screenshot.length,
    });
    res.end(screenshot);

    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating screenshot.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
