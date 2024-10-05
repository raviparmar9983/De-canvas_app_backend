"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPaswordTemplate = void 0;
const resetPaswordTemplate = (link) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .ideation-body {
                display: inline-grid;
                grid-template-columns: 600px 600px;
                margin: 4px;
            }
            .ideation-head {
                display: inline-grid;
                grid-template-columns: 450px 600px 150px;
                align-items: center;
            }
            .block {
                min-height: 250px;
                border: 2px solid black;
            }
            .block-1 {
                grid-area: 1/1/2/3;
            }
            .block-4 {
                grid-area: 3/1/4/3;
            }
            .gradient-custom-4 {
                background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
                background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            }
        </style>
    </head>
    <body>
        <div class="ideation-head gradient-custom-4">
            <h1>Password Reset Request</h1>
        </div>
        <div class="ideation-body block-1">
            <p>Dear User,</p>
            <p>It looks like you requested to reset your password. Click the link below to reset it:</p>
            <a href=${link}>${link}</a> <!-- Displaying the link as a simple text link -->
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br/>DE canvas Maker</p>
        </div>
    </body>
    </html>
    `;
};
exports.resetPaswordTemplate = resetPaswordTemplate;
