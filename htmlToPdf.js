
const puppeteer = require('puppeteer');

// Middleware to parse JSON body


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


 

