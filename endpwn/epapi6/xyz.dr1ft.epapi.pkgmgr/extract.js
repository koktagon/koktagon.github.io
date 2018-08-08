/*

    EndPwn Package Manager

    Copyright 2018 EndPwn Project
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    DO NOT EDIT THIS FILE! Your bootstrap may overwrite changes to it, and you will lose your work!
    EndPwn3 users: You can prevent this by creating a file in the same directory named DONTUPDATE
    
    https://github.com/endpwn/

*/

// code adapted from moduleUpdater.js

const yauzl = require('yauzl');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('original-fs');

module.exports = function (zip, extractRoot) {

    new Promise((resolve, reject) => {

        yauzl.open(zip, { lazyEntries: true, autoClose: true }, (err, zipfile) => {

            if (err) {
                reject(err);
                return;
            }

            zipfile.on('entry', function (entry) {

                // skip directories
                if (/\/$/.test(entry.fileName)) {
                    zipfile.readEntry();
                    return;
                }

                zipfile.openReadStream(entry, function (err, stream) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    stream.on('error', function (e) {
                        return reject(e);
                    });

                    mkdirp(path.join(extractRoot, path.dirname(entry.fileName)), function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        var writeStream = fs.createWriteStream(path.join(extractRoot, entry.fileName));

                        writeStream.on('error', function (e) {
                            stream.destroy();
                            handleErr(e);
                        });

                        writeStream.on('finish', function () {
                            return zipfile.readEntry();
                        });

                        stream.pipe(writeStream);
                    });
                });
            });

            zipfile.on('error', function (err) {
                reject(err, zipfile);
            });

            zipfile.on('end', function () {
                resolve();
            });

            zipfile.readEntry();

        });

    });

}