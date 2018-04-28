const express = require('express');

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

const PORT = process.env.PORT || 4000;

const app = express();

app.set('trust proxy', 1) // trust first proxy, maybe necessary for cookie work

app.use(cookieSession({
    name: 'session',
    keys: ["key1", "key2"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cookieParser());

app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1

    // Log cookies for no particular reason
    console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);

    res.send(`
    <html>
        <head>
        </head>
        <body>
            <h1>Welcome to the Calculator!</h1>
            <p>Visit /calculator/(operator)/(firstnumber)/(secondnumber) to use the calculator</p>
            <p>Operator List:</o>
            <ul>
                <li>add</li>
                <li>subtract</li>
                <li>multiply</li>
                <li>divide</li>
            </ul>
            <p>For example, ${req.headers.host}/calculator/add/2/3</p>
            <p><a href="/calculator/add/2/3">Try it!</a></p>
            <h3>Tracking info:</h3>
            <p>Your homepage views: ${req.session.views}</p>
            <p>Your calculator uses: ${req.session.calculatorUses || 0}</p>

        </body>
    </html>
    `);
});

app.get('/calculator/:operator/:firstnum/:secondnum', function (req, res) {
    req.session.calculatorUses = (req.session.calculatorUses || 0) + 1

    var operator = req.params.operator.toLowerCase();
    var firstNum = parseInt(req.params.firstnum);
    var secondNum = parseInt(req.params.secondnum);
    var result = `<html><head><title>Result</title></head><body><h1>`;

    switch (operator) {
        case "add":
            result = `${firstNum} + ${secondNum} = ${firstNum + secondNum}`;
            break;
        case "subtract":
            result = `${firstNum} - ${secondNum} = ${firstNum - secondNum}`;
            break;
        case "multiply":
            result = `${firstNum} * ${secondNum} = ${firstNum * secondNum}`;
            break;
        case "divide":
            result = `${firstNum} / ${secondNum} = ${firstNum / secondNum}`;
            break;
        default:
            result = "Error calculating.";
    }

    result += `</h1><p><a href="/">Return Home</a></p></body></html>`;
    res.send(result);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
