const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }

}

if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2]);
}