const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const app = express();


function q1() {
    const questions1 = [
        {
            type: 'input',
            name: 'fp',
            message: "What is file directory path? (do not include file name)"
        }
    ];

    inquirer.prompt(questions1).then(answers => {
        const FP = answers['fp'];
        q2(FP)
    })

}

function q2(_fp) {
    const questions2 = [
        {
            type: 'input',
            name: 'fn',
            message: "What is the file name? (leave blank for index.html)"
        }
    ];

    inquirer.prompt(questions2).then(answers => {
        const FN = answers['fn'];
        serve(FN, _fp)
    })
}

function serve(filename, filepath) {
    app.get('/', function (request, response) {
        response.sendFile(path.join(`${filepath}`, filename));
    })

    app.get('*', function (request, response) {
        response.send('Error 404. Page not found.');
    })


    app.listen(7000, function () {
        console.log("Local host served! Running at: http://localhost:7000/")
    });
}

q1()
