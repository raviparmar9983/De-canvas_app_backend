"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountTemplate = void 0;
const verifyAccountTemplate = (link) => {
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
        .btn {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="ideation-head gradient-custom-4">
        <h1>Verify Your Account</h1>
    </div>
    <div class="ideation-body block-1">
        <p>Dear User,</p>
        <p>Thank you for signing up. Click the button below to verify your account:</p>
        <a href=${link}>${link}</a>
        <p>If you didn't sign up, please ignore this email.</p>
        <p>Best regards,<br/>Your Company</p>
    </div>
</body>
</html>

    `;
};
exports.verifyAccountTemplate = verifyAccountTemplate;
