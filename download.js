const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://d1a370nemizbjq.cloudfront.net/60eb6a70e70be310461bf06a.glb';
const dest = path.join(__dirname, 'public', 'avatar.glb');

console.log("Downloading from", url);
https.get(url, (res) => {
    if(res.statusCode !== 200) {
        console.error("Failed to download. Status:", res.statusCode);
        process.exit(1);
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log("Downloaded successfully.");
    });
}).on('error', (err) => {
    console.error("Network Error:", err.message);
    process.exit(1);
});
