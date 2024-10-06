"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmpathyHtmlString = void 0;
const generateEmpathyHtmlString = (empathy) => {
    return `
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Empathy Summary</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                .empathy-body{
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
    .empathy-head{
        display: grid;
        grid-template-columns: 600px 600px;
    }
    .block-3{
        grid-area: 2/1/3/3;
    }
    .block-4{
        grid-area: 3/1/4/3;
    }
    .block-5{
        grid-area: 4/1/5/3;
    }
    .block-6{
        grid-area: 5/1/6/3;
    }
    .block-7{
        grid-area: 6/1/7/3;
    }
    .gradient-custom-4 {
        /* fallback for old browsers */
        background: #84fab0;
        
        /* Chrome 10-25, Safari 5.1-6 */
        background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
        
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
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
            <div class="empathy-container border border-2 border-dark" style="width: 1212px;">
                <div class="empathy-head pt-1 pb-1">
                <section class="d-flex flex-column ms-1">
                    <h3>Design For: <span>${empathy.projectname}</span></h3>
                    <h3>Date: <span>${empathy.date ? empathy.date : ''}</span></h3>
                </section>
                <section class="d-flex flex-column me-1">
                    <h3>Design By: <span>${empathy.projectid}</span></h3>
                    <h3>Version: <span>${empathy.version ? empathy.version : ''}</span></h3>
                </section>
                </div>
                <div class="empathy-body">
                <div class="block block-1">
                    <h5>Users</h5>
                    ${empathy.user.map((usr, i) => `<p class="bg-warning p-1 ptag" id="${i}">${usr}</p>`).join('')}
                </div>
                <div class="block block-2">
                    <h5>Stakeholders</h5>
                    ${empathy.stackholder.map((stake, i) => `<p class="bg-warning p-1 ptag" id="${i}">${stake}</p>`).join('')}
                </div>
                <div class="block block-3">
                    <h5>Activities</h5>
                    ${empathy.activities.map((activity, i) => `<p class="bg-warning p-1 ptag" id="${i}">${activity}</p>`).join('')}
                </div>
                <div class="block block-4">
                    <h5>Happy 1</h5>
                    ${empathy.happy1.map((happy, i) => `<p class="bg-warning p-1 ptag" id="${i}">${happy}</p>`).join('')}
                </div>
                <div class="block block-5">
                    <h5>Sad 1</h5>
                    ${empathy.sad1.map((sad, i) => `<p class="bg-warning p-1 ptag" id="${i}">${sad}</p>`).join('')}
                </div>
                <div class="block block-6">
                    <h5>Happy 2</h5>
                    ${empathy.happy2.map((happy, i) => `<p class="bg-warning p-1 ptag" id="${i}">${happy}</p>`).join('')}
                </div>
                <div class="block block-7">
                    <h5>Sad 2</h5>
                    ${empathy.sad2.map((sad, i) => `<p class="bg-warning p-1 ptag" id="${i}">${sad}</p>`).join('')}
                </div>
                </div>
            </div>
            </body>
        </html>
        `;
};
exports.generateEmpathyHtmlString = generateEmpathyHtmlString;
