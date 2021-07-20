const fs = require('fs');
const testFolder = './test/';
const videoDir = './test/video/';
const capturedDir = testFolder + 'captured/';
const duplicatedDir = testFolder + 'duplicated/';
fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
        const fileLen = file.length;
        const start = fileLen - 4;
        const end = fileLen;

        // mkdir video dir and move video to video dir
        if ((file.slice(start, end) === '.mov') || (file.slice(start, end) === '.mp4')) {
            if (!fs.existsSync(videoDir)) {
                fs.mkdirSync(videoDir);
            } 
            fs.renameSync('./test/' + file, videoDir + file, (error) => {
                if (error) throw(error);
            });
            console.log(`move ${file} to video`);
        };

        // mkdir captured dir and move captured to captured dir
        if ((file.slice(start, end) === '.png') || (file.slice(start, end) === '.aae')) {
            if (!fs.existsSync(capturedDir)) {
                fs.mkdirSync(capturedDir);
            };
            fs.renameSync('./test/' + file, capturedDir + file, (error) => {
                if (error) throw(error);
            });
            console.log(`move ${file} to captured`);
        };

        // mkdir dupli and move origin to dupli dir
        if ((file.slice(0, 5) === 'IMG_E')) {
            if (!fs.existsSync(duplicatedDir)) {
                fs.mkdirSync(duplicatedDir);
            };
            const origin = ((file.slice(0, 4)) + file.slice(5));
            for (let i = 0; i < files.length; i++) {
                if (files[i] === origin) {
                    fs.renameSync('./test/' + origin, duplicatedDir + origin, (error) => {
                        if (error) throw(error);
                    });
                    console.log(`move ${origin} to duplicated`);
                };
            };
        };
    });
});
    // fs.renameSync(videoDir, './test/' + 'something', (err) => {if (err) throw(err)});
    // fs.renameSync('./test/' + 'something', videoDir, (err) => {if (err) throw(err)});

// move path
// fs.rename(oldpath, newpath, callback)

process.argv.forEach((name) => {
    console.log(name);
});