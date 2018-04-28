const express = require('express');

const PORT = process.env.PORT || 4000;
const app = express()

app.get('/', (req, res) => {
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
        </body>
    </html>
    `);
});

app.get('/calculator/:operator/:firstnum/:secondnum', function (req, res) {
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

    result += `</h1></body></html>`;
    res.send(result);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
