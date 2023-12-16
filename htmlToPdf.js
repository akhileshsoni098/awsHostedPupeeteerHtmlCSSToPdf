

const puppeteer = require('puppeteer');


(async () => {
  try {
    await puppeteer.defaultArgs({
      executablePath: '/usr/bin/google-chrome' ,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new',
    });
  } catch (error) {
    console.error('Error setting default args for Puppeteer:', error);
  }
})();

exports.htmlTopdf =  async (req, res) => {
  try {
    const { html, cssStyles } = req.body;

    if (!html || !cssStyles) {
      return res.status(400).send('HTML code and CSS styles are required.');
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set content to the page
    await page.setContent(`<style>${cssStyles}</style>${html}`);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      printBackground: true,
    });

    await browser.close();

    // Send PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
};

  

// Modify the API endpoint to include the CSS styles in the request body
/* 
const puppeteer = require('puppeteer');

(async () => {
    try {
      await puppeteer.defaultArgs({
        executablePath: '/usr/bin/google-chrome' ,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
      });
    } catch (error) {
      console.error('Error setting default args for Puppeteer:', error);
    }
  })();
  


exports.htmlTopdf = async (req, res) => {
    try {
      const { html, cssStyles } = req.body;
  
      if (!html || !cssStyles) {
        return res.status(400).send('HTML code and CSS styles are required.');
      }
  
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
  
      // Set content to the page with provided CSS styles
      await page.setContent(`<style>${cssStyles}</style>${html}`);
  
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
        printBackground: true,
      });
  
      await browser.close();
  
      // Send PDF as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
      res.send(pdfBuffer);
    } catch (err) {
      console.error('Error generating PDF:', err);
      res.status(500).send('Error generating PDF');
    }
  };
  
 */





/* 

const puppeteer = require('puppeteer');

(async () => {
  try {
    await puppeteer.defaultArgs({
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new',
    });
  } catch (error) {
    console.error('Error setting default args for Puppeteer:', error);
  }
})();

exports.htmlTopdf = async (req, res) => {
  try {
    const { htmlCss } = req.body;

    if (!htmlCss) {
      return res.status(400).send('HTML code with CSS styles is required.');
    }

    // Split the input into HTML and CSS
    const [cssStart, htmlStart] = htmlCss.split('<style>');
    const [cssStyles] = cssStart.split('</style>');
    const [html] = htmlStart.split('</style>');

    console.log()
    if (!html || !cssStyles) {
      return res.status(400).send('Invalid HTML code or CSS styles.');
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set content to the page

   
    await page.setContent(`<style>${cssStyles}</style>${html}`);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    });

    await browser.close();

    // Send PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
};
 */