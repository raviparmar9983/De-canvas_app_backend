import puppeteer, { PaperFormat } from 'puppeteer';
export async function generatePdf(htmlString: string, pageType: PaperFormat, scale: number,isLandscap=false) {
    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch(
        {
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    );
    const page = await browser.newPage();

    // Set the HTML content to the page
    await page.setContent(htmlString, { waitUntil: 'networkidle0' });

    // Generate a PDF with specific options
    const pdf = await page.pdf({
        path: 'AEIOU_Summary_A2_180Scale.pdf', // Output file name
        format: pageType,                         // Set page size to A2
        printBackground: true,                // Include background styles in the PDF
        scale: scale,            
        landscape:isLandscap,               // Custom scale of 180%
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px',
        },
    });
    await browser.close();
    return pdf;
}
