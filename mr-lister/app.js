#!/usr/bin/env node
const fs = require('fs');
const fsPromises = fs.promises;
const process = require('process');
const readline = require('readline');

const commands = {
     "-a": "all",
     "-ua": "user access",
     "-d": "directory",
     "-l": "long format",
     "-la": "including hidden files"
};

var directoryPath = __dirname;

function listFilesUserAccess () {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Sorry :( an error occour');
        }

        for (let file of files) {
            fsPromises.access(file, fs.constants.R_OK | fs.constants.W_OK)
            .then(() => { process.stdout.write(file); process.stdout.write('  \x1b[42maccess\x1b[0m\n');} )
            .catch(() => { process.stdout.write(file); process.stdout.write('  \x1b[41mcan not access\x1b[0m \n');});
        }
    });
}

function listAllFiles () {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Sorry :( an error occour');
        }

        for (let file of files) {
            process.stdout.write(file + '\n');
        }
    });
}

function clearConsole () {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}

function commandRouter () {
    let command = process.argv[2];
    let commandList = Object.keys(commands);
    clearConsole();
    switch (command) {
        case commandList[0]:
            listAllFiles();
            break;
        case commandList[1]:
            listFilesUserAccess();
            break;

        default:
            process.stdout.write('\x1b[31m command not found \x1b[0m \n');
            break;
    }
}

commandRouter();
