"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdeationHtmlString = void 0;
const generateIdeationHtmlString = (ideation) => {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ideation Canvas</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            .ideation-body{
                display: inline-grid;
                grid-template-columns: 600px 600px;
                margin: 4px;
            }
            .ideation-head {
                display: inline-grid;
                grid-template-columns: 450px 600px 150px;
                align-items: center;
            }
            .block{
                min-height: 250px;
                border: 2px solid black;
            }
            .block-1{
                grid-area: 1/1/2/3;
            }
            .block-4{
                grid-area: 3/1/4/3;
            }
            .gradient-custom-4 {
                /* fallback for old browsers */
                background: #84fab0;
                
                /* Chrome 10-25, Safari 5.1-6 */
                background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
                
                /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            }
            .content {
                height: 100%;
                width: 100%;
                margin: 2px;
                padding: 1px;
            }
            .ptag {
                margin: 2px;
                display: inline-block;
                word-break: break-word;
            }
          </style>
        </head>
        <body class="d-flex justify-content-center mt-5 flex-column align-items-center" style="width: 100vw;">
          <div class="ideation-container border border-2 border-dark" style="width: 1212px;">
            <div class="ideation-head pt-1 pb-1">
              <section class="ms-1">
                <h3>The ideanaut : Ideation Canvas</h3>
              </section>
              <section class="d-flex">
                <h5>Project: <span>${ideation.projectname}</span></h5>
              </section>
              <section class="d-flex">
                <h5>Team: <span>${ideation.projectid}</span></h5>
              </section>
            </div>
            <div class="ideation-body">
              <div class="block block-1">
                <h5>People</h5>
                ${ideation.people.map((person, i) => `<p class="bg-warning p-1 ptag" id="${i}">${person}</p>`).join('')}
              </div>
              <div class="block block-2">
                <h5>Activity</h5>
                ${ideation.activity.map((act, i) => `<p class="bg-warning p-1 ptag" id="${i}">${act}</p>`).join('')}
              </div>
              <div class="block block-3">
                <h5>Situation/Context/Location</h5>
                ${ideation.context.map((ctx, i) => `<p class="bg-warning p-1 ptag" id="${i}">${ctx}</p>`).join('')}
              </div>
              <div class="block block-4">
                <h5>Props / Possible Solution</h5>
                ${ideation.props.map((prop, i) => `<p class="bg-warning p-1 ptag" id="${i}">${prop}</p>`).join('')}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};
exports.generateIdeationHtmlString = generateIdeationHtmlString;
