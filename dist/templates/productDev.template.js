"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductDevelopmentHtmlString = void 0;
const generateProductDevelopmentHtmlString = (product_development) => {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Product Development Summary</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            .product-body {
              display: inline-grid;
              grid-template-columns: 300px 600px 300px;
              margin: 4px;
            }
            .product-head {
              display: inline-grid;
              grid-template-columns: 420px 260px 260px 260px;
              align-items: center;
            }
            .block {
              min-height: 250px;
              border: 2px solid black;
            }
            .block-1 {
              grid-area: 1/1/3/2;
            }
            .block-3 {
              grid-area: 1/3/3/4;
            }
            .block-5 {
              grid-area: 3/1/5/2;
            }
            .block-7 {
              grid-area: 3/3/5/4;
            }
            .gradient-custom-4 {
              /* fallback for old browsers */
              background: #84fab0;
              background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
              background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            }
            .content {
              height: 100%;
              width: 100%;
              margin: 2px;
              padding: 1px;
            }
            .ptag {
            display: inline-block;
                word-break: break-word;
              margin: 2px;
            }
          </style>
        </head>
        <body class="d-flex justify-content-center mt-5 flex-column align-items-center" style="width: 100vw;">
          <div class="product-container border border-2 border-dark" style="width: 1212px;">
            <div class="product-head pt-1 pb-1">
              <section class="ms-1">
                <h2>The Product Development</h2>
              </section>
              <section>
                <h5>Team: <span>${product_development.projectid}</span></h5>
              </section>
              <section>
                <h5>Date: <span>${product_development.date ? product_development.date : ''}</span></h5>
              </section>
              <section class="me-1">
                <h5>Version: <span>${product_development.version ? product_development.version : ''}</span></h5>
              </section>
            </div>
            <div class="product-body">
              <div class="block block-1">
                <h5>Purpose Info</h5>
                ${product_development.purpose_info.map((info, i) => `<p class="bg-warning p-1 ptag" id="${i}">${info}</p>`).join('')}
              </div>
              <div class="block block-2">
                <h5>Product Experience</h5>
                ${product_development.product_expr.map((experience, i) => `<p class="bg-warning p-1 ptag" id="${i}">${experience}</p>`).join('')}
              </div>
              <div class="block block-3">
                <h5>Customer Revalidation</h5>
                ${product_development.customer_revali.map((revalidation, i) => `<p class="bg-warning p-1 ptag" id="${i}">${revalidation}</p>`).join('')}
              </div>
              <div class="block block-4">
                <h5>Product Function</h5>
                ${product_development.product_fun.map((functionality, i) => `<p class="bg-warning p-1 ptag" id="${i}">${functionality}</p>`).join('')}
              </div>
              <div class="block block-5">
                <h5>People Info</h5>
                ${product_development.people_info.map((people, i) => `<p class="bg-warning p-1 ptag" id="${i}">${people}</p>`).join('')}
              </div>
              <div class="block block-6">
                <h5>Product Features</h5>
                ${product_development.product_feature.map((feature, i) => `<p class="bg-warning p-1 ptag" id="${i}">${feature}</p>`).join('')}
              </div>
              <div class="block block-7">
                <h5>Reject, Redesign, Retain</h5>
                ${product_development.reject.map((reject, i) => `<p class="bg-warning p-1 ptag" id="${i}">${reject}</p>`).join('')}
              </div>
              <div class="block block-8">
                <h5>Component Info</h5>
                ${product_development.component_info.map((component, i) => `<p class="bg-warning p-1 ptag" id="${i}">${component}</p>`).join('')}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};
exports.generateProductDevelopmentHtmlString = generateProductDevelopmentHtmlString;
