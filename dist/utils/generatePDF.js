"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function generatePdf(htmlString_1, pageType_1, scale_1) {
    return __awaiter(this, arguments, void 0, function* (htmlString, pageType, scale, isLandscap = false) {
        // Launch Puppeteer in headless mode
        const browser = yield puppeteer_1.default.launch({
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = yield browser.newPage();
        // Set the HTML content to the page
        yield page.setContent(htmlString, { waitUntil: 'networkidle0' });
        // Generate a PDF with specific options
        const pdf = yield page.pdf({
            path: 'AEIOU_Summary_A2_180Scale.pdf', // Output file name
            format: pageType, // Set page size to A2
            printBackground: true, // Include background styles in the PDF
            scale: scale,
            landscape: isLandscap, // Custom scale of 180%
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
            },
        });
        yield browser.close();
        return pdf;
    });
}
exports.generatePdf = generatePdf;
