const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];
const { base64 } = require("js-base64");

//(async () => {
//const browser = await puppeteer.launch();
// Store the endpoint to be able to reconnect to Chromium
//   browser.on("targetcreated", () => {
//     console.log("新开页面");
//   });
//const browserWSEndpoint = browser.wsEndpoint();
// Disconnect puppeteer from Chromium
//   browser.on("disconnected", () => {
//     console.log("disconnected");
//   });
//   browser.on("targetchanged", () => {
//     console.log("targetchanged");
//   });
//   const page = await browser.newPage(); //承诺解析为新的Page对象。
//   await page.evaluate(() =>
//     window.open("https://qa-i18n-h5-game.8win.com/game/index")
//   );
//   const newWindowTarget = await browser.waitForTarget(
//     target => target.url() === "https://qa-i18n-h5-game.8win.com/game/index"
//   );
//   //查找通过window.open打开的页面的目标的示例：
//   console.log(newWindowTarget);
//   browser.disconnect(); //断开Puppeteer与浏览器的连接，但保持Chromium进程运行。调用断开连接后，浏览器对象被视为已处置，无法再使用。

// Use the endpoint to reestablish a connection
//   const browser2 = await puppeteer.connect({ browserWSEndpoint });
//   // Close Chromium
//   browser2.on("targetdestroyed", () => {
//     console.log("targetdestroyed销毁");
//   });

//   const browserContexts = browser2.browserContexts(); //返回所有打开的浏览器上下文的数组。在新创建的浏览器中，这将返回BrowserContext的单个实例。

//   const createIncognitoBrowserContext = await browser2.createIncognitoBrowserContext(); //创建一个新的隐身浏览器上下文。这不会与其他浏览器上下文共享cookie /缓存。

//browser2.defaultBrowserContext();//"返回默认浏览器上下文。默认浏览器上下文无法关闭"
//   browser2.isConnected(); // return true false 表示浏览器已连接
//   const page = browser2.newPage(); //承诺解析为新的Page对象。
//   browser2.pages(); //浏览器中所有页面的数组。在多个浏览器上下文的情况下，该方法将返回一个数组，其中包含所有浏览器上下文中的所有页面。
//   const process = browser2.process(); // return <？ChildProcess>生成的浏览器进程。如果浏览器实例是使用puppeteer.connect方法创建的，则返回null。

//   const target2 = browser2.target(); // return <？ChildProcess>生成的浏览器进程。如果浏览器实例是使用puppeteer.connect方法创建的，则返回null。
//   const targets2 = browser2.targets(); //浏览器内所有活动目标的数组。如果有多个浏览器上下文，则该方法将返回一个数组，其中包含所有浏览器上下文中的所有目标
//   const userAgent = await browser2.userAgent(); //注意页面可以使用page.setUserAgent覆盖浏览器用户代理。
//   const version = await browser2.version();
//   await page.goto("https://qa-i18n-h5-game.8win.com/game/index");
//   await page.evaluate(() =>
//     window.open("https://qa-i18n-h5-game.8win.com/game/index")
//   );
//   const newWindowTarget = await browser.waitForTarget(
//     target => target.url() === "https://qa-i18n-h5-game.8win.com/game/index"
//   );
//   const browserArr = await browser.close(); //"关闭Chromium及其所有页面（如果已打开）。浏览器对象本身被认为是已处置，无法再使用"
// })();

//browser.createIncognitoBrowserContext（）方法创建“隐身”浏览器上下文。 “隐身”浏览器上下文不会将任何浏览数据写入磁盘。

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage(); //页面提供了与Chromium中的单个标签页或扩展程序后台页面进行交互的方法。一个浏览器实例可能具有多个Page实例。
  await page.emulate(iPhone);
  page.once("load", async () => {
    await page.screenshot({ path: "screenshot.png" });
  });
  page.on("domcontentloaded", async () => {
    const dalay = times =>
      new Promise((res, rej) => {
        setTimeout(() => {
          res("ok");
        }, times);
      });
    console.log("Page domcontentloaded!");
  });
  await page.goto("https://m.qidian.com");

  page.on("dialog", msg => {
    console.log(msg);
  });
  //   page.on("request", msg => {
  //     console.log(msg);
  //   });
  page.on("requestfailed", msg => {
    console.log(msg);
  });
  page.on("workercreated", msg => {
    console.log(msg);
  });

  page.on("response", async response => {
    try {
      console.log(await response.text());
      if (response.code === 0 && /majax/.test(await response.request().url())) {
        const data = await response.json();
        // data.data = Base64.decode(data.data);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  });
})();
