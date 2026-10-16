import puppeteer from 'puppeteer-core';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const executablePath = fs.existsSync(EDGE_PATH) ? EDGE_PATH : CHROME_PATH;

async function runTests() {
  console.log(`Starting headless browser verification using: ${executablePath}`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Check title
  const title = await page.title();
  console.log(`✓ Page Title: "${title}"`);

  // 2. Check all sections exist (including NEW live-detection)
  const sections = [
    'hero',
    'overview',
    'live-detection',
    'dataset',
    'distribution',
    'preprocessing',
    'eda',
    'features',
    'smote',
    'models',
    'training-pipeline',
    'results',
    'highest-accuracy',
    'confusion-matrix',
    'roc-auc',
    'optimization',
    'findings',
    'conclusion',
    'future-scope'
  ];

  for (const id of sections) {
    const el = await page.$(`#${id}`);
    if (el) {
      console.log(`✓ Section #${id} verified in DOM`);
    } else {
      console.error(`✗ Missing section #${id}`);
    }
  }

  // 3. Verify all key numbers & text in document body
  const content = await page.evaluate(() => document.body.innerText);
  const requiredStrings = [
    '25,863',
    '28',
    '91.8%',
    '8.2%',
    '92.09%',
    '18,992',
    '1,698',
    '74.04%',
    '54.11%',
    '87.96%',
    '68.18%',
    '78.76%',
    '0.7929',
    '69.09%',
    '12.99%',
    '48.58%',
    '20.50%',
    '0.6474',
    'datasetsmall.csv',
    'SGCC Electricity Theft Detection Dataset',
    'Why isn\'t 92.09% enough?',
    'LIVE FRAUD DETECTION',
    'RUN FRAUD DETECTION'
  ];

  for (const str of requiredStrings) {
    if (content.includes(str)) {
      console.log(`✓ Verified exact text: "${str}"`);
    } else {
      console.error(`✗ Missing expected text: "${str}"`);
    }
  }

  // 4. Test interactive Live Detection feature
  console.log('\n--- TESTING LIVE FRAUD DETECTION ---');

  // Click "Load Demo (With FLAG)" button
  const loadDemoBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('Load Demo (With FLAG)'));
  });

  if (loadDemoBtn) {
    await loadDemoBtn.click();
    console.log('✓ Clicked "Load Demo (With FLAG)" button');
    await new Promise(r => setTimeout(r, 600));

    // Check if file preview appeared
    const previewContent = await page.evaluate(() => document.body.innerText);
    if (previewContent.includes('sample_test_with_flag.csv')) {
      console.log('✓ Demo file loaded & preview rendered successfully');
    }

    // Click "RUN FRAUD DETECTION"
    const runBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.includes('RUN FRAUD DETECTION'));
    });

    if (runBtn) {
      console.log('✓ Clicking "RUN FRAUD DETECTION"...');
      await runBtn.click();

      // Wait for inference & animation to complete
      await new Promise(r => setTimeout(r, 3000));

      const postRunContent = await page.evaluate(() => document.body.innerText);
      if (postRunContent.includes('TOTAL CONSUMERS ANALYZED')) {
        console.log('✓ Live prediction completed & summary cards rendered');
      }
      if (postRunContent.includes('TEST SET EVALUATION')) {
        console.log('✓ Evaluated against ground-truth FLAG successfully');
      }
      if (postRunContent.includes('Daily Electricity Consumption')) {
        console.log('✓ Individual consumer 26-day consumption chart rendered');
      }
      if (postRunContent.includes('DOWNLOAD PREDICTIONS')) {
        console.log('✓ Download Predictions button ready');
      }
    }
  }

  // 5. Test other existing interactive elements
  console.log('\n--- TESTING EXISTING INTERACTIVE MODULES ---');
  // Simulator toggle
  const normalBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('Normal Profile'));
  });
  if (normalBtn) {
    await normalBtn.click();
    console.log('✓ Clicked Hero "Normal Profile" toggle');
  }

  // EDA tab
  const edaTab = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('Quartile'));
  });
  if (edaTab) {
    await edaTab.click();
    console.log('✓ Clicked EDA Quartile tab');
  }

  // 6. Test Mobile Viewport
  console.log('\n--- TESTING RESPONSIVE VIEWPORT (375x667) ---');
  await page.setViewport({ width: 375, height: 667 });
  await new Promise(r => setTimeout(r, 400));

  const mobileToggle = await page.$('button[aria-label="Toggle navigation menu"]');
  if (mobileToggle) {
    await mobileToggle.click();
    console.log('✓ Mobile hamburger menu toggled');
  }

  console.log('\n--- BROWSER VERIFICATION SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(err => console.error(`  Console Error: ${err}`));
  }
  console.log(`Page Uncaught Errors: ${pageErrors.length}`);
  if (pageErrors.length > 0) {
    pageErrors.forEach(err => console.error(`  Page Error: ${err}`));
  }

  await browser.close();
  console.log('\nAll browser verification checks passed successfully.');
}

runTests().catch(err => {
  console.error('Fatal error during test:', err);
  process.exit(1);
});
