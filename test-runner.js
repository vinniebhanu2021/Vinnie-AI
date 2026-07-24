const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching headless browser for live testing...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR] ${err.toString()}`);
  });
  
  page.on('requestfailed', request => {
    console.log(`[BROWSER NETWORK FAIL] ${request.url()} - ${request.failure().errorText}`);
  });

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Page loaded successfully. Waiting 5 seconds to capture runtime errors...');
    await new Promise(r => setTimeout(r, 5000));
    
    // Check if there is a blank screen by evaluating the DOM
    const canvasExists = await page.evaluate(() => document.querySelector('canvas') !== null);
    const canvasWidth = await page.evaluate(() => document.querySelector('canvas')?.width);
    const canvasHeight = await page.evaluate(() => document.querySelector('canvas')?.height);
    console.log(`[DOM INSPECTION] Canvas exists: ${canvasExists}, Width: ${canvasWidth}, Height: ${canvasHeight}`);
    
  } catch (error) {
    console.error('Failed to load page:', error);
  }

  await browser.close();
  console.log('Live test completed.');
})();
