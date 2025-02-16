exports.files =[]

const fs = require('fs');

const files = fs.existsSync("./uploads") 
    ? fs.readdirSync("./uploads").map(filename => ({
        fileName: filename,
        path: `./uploads/${filename}`
    })) 
    : [];

module.exports = { files };
