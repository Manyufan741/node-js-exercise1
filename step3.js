const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path, destination) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`${err}`);
            process.exit(1);
        }
        // console.log(data);
        writeFile(destination, data);
    })
}

async function webCat(url, destination) {
    try {
        let res = await axios.get(url);
        // console.log(res.data);
        writeFile(destination, res.data)
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
}

function writeFile(path, content) {
    fs.writeFile(path, content, err => {
        if (err) {
            console.error(`${err}`);
            process.exit(1);
        }
    })
}

function read(arg, destination) {
    if (arg[2].slice(0, 4) === 'http') {
        webCat(arg[2], destination);
    } else {
        cat(arg[2], destination);
    }
}

function commandLineParse(argv) {
    let idx = 0
    let destination = null;
    let newArg = [];
    for (arg of argv) {
        if (arg === '--out') {
            if (idx >= argv.length - 1) {
                console.log("Please speficy a file to write in.");
                process.exit(1);
            } else {
                //writeFile(arg[idx + 1]);
                destination = argv[idx + 1];
                argv = argv.splice(idx + 1, 1);
            }
        } else {
            newArg.push(arg);
        }
        idx += 1;
    }
    read(newArg, destination);
}

commandLineParse(argv);


