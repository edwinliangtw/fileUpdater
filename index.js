const fs = require('fs');
const path = require('path');
var exec = require('child_process').exec;
const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' }));
const oldPath = path.resolve(config.filePath);
const newPath = path.resolve(config.updateFilePath);
exec("git pull", function (err, stdout, stderr) {
    if (err) {
        console.log('git pull fail');
    } else {
        fs.copyFileSync(oldPath, newPath);
        exec(`git add .`, function (err, stdout, stderr) {
            if (err) {
                console.log('git add error');
            } else {
                exec(`git commit -m '${Date.now()}' | git push`, function (err, stdout, stderr) {
                    if (err) {
                        console.log('git commit error');
                    } else {
                        exec(`git push`, function (err, stdout, stderr) {
                            if (err) {
                                console.log('git push error');
                            } else {
                                console.log('update success');
                            }
                        });
                    }
                });
            }
        });
    }
});