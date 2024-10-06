"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlString = void 0;
const generateHtmlString = (aeiou) => {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AEIOU Summary</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            .aeiou-head {
              display: grid;
              grid-template-columns: 308px 525px 213px 157px;
            }
            .aeiou-body {
              display: inline-grid;
              grid-template-columns: 400px 200px 200px 400px;
              margin: 4px;
            }
            .block {
              min-height: 300px;
              border: 2px solid black;
            }
            .block-2 {
              grid-area: 1/2/2/4;
            }
            .block-4 {
              grid-area: 2/1/3/3;
            }
            .block-5 {
              grid-area: 2/3/3/5;
            }
            .gradient-custom-4 {
              background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            }
            .title, label, option {
              color: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            }
            .error {
              color: red;
            }
            input, select {
              border: none !important;
              border-bottom: 3px solid rgb(111, 206, 145) !important;
            }
            .shadow1 {
              box-shadow: 10px 10px 10px 10px black;
            }
            .ptag {
            display: inline-block;
            word-break: break-word;
            margin: 2px;
          }
          </style>
        </head>
        <body class="d-flex justify-content-center mt-5 position-relative flex-column align-items-center" style="width: 100vw;">
          <div class="d-flex aeoou-parent w-100">
            <div class="aeiou-container border border-2 border-dark" style="width: 1212px;">
              <div class="aeiou-head pt-1 pb-1">
                <section class="ms-1">
                  <h1>AEIOU Summary</h1>
                </section>
                <div class="d-flex flex-column ps-2">
                  <section>
                    <h5>Group ID: ${aeiou.projectid}</h5>
                  </section>
                  <section>
                    <h5>Domain Name: ${aeiou.projectname}</h5>
                  </section>
                </div>
                <section class="d-flex align-items-center">
                  <h5>Date: ${aeiou.date ? aeiou.date : ''}</h5>
                </section>
                <section class="d-flex align-items-center">
                  <h5>Version: ${aeiou.v ? aeiou.v : ''}</h5>
                </section>
              </div>
              <div class="aeiou-body">
                <div class="block block-1">
                  <h5>Environment</h5>
                  ${aeiou.environment.map((env, i) => `<p class="bg-warning p-1 ptag" id="${i}">${env}</p>`).join('')}
                </div>
                <div class="block block-2">
                  <h5>Interaction</h5>
                  ${aeiou.intrection.map((intr, i) => `<p class="bg-warning p-1 ptag" id="${i}">${intr}</p>`).join('')}
                </div>
                <div class="block block-3">
                  <h5>Objects</h5>
                  ${aeiou.object.map((obj, i) => `<p class="bg-warning p-1 ptag" id="${i}">${obj}</p>`).join('')}
                </div>
                <div class="block block-4">
                  <h5>Activities</h5>
                  ${aeiou.activity.map((act, i) => `<p class="bg-warning p-1 ptag" id="${i}">${act}</p>`).join('')}
                </div>
                <div class="block block-5">
                  <h5>Users</h5>
                  ${aeiou.user.map((usr, i) => `<p class="bg-warning p-1 ptag" id="${i}">${usr}</p>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};
exports.generateHtmlString = generateHtmlString;
