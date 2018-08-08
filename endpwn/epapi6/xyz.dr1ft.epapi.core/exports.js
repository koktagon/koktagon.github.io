/*

    EPAPI6 Core API

    Copyright 2018 EndPwn Project
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    DO NOT EDIT THIS FILE! Your bootstrap may overwrite changes to it, and you will lose your work!
    EndPwn3 users: You can prevent this by creating a file in the same directory named DONTUPDATE
    
    https://github.com/endpwn/

*/

const fs = require('fs');
const data = endpwn.data;

function print(t) {
    console.log(`%c[Core]%c ${t}`, 'font-weight:bold;color:#0cc', '');
}

function warn(t, e) {
    if (e === undefined) e = ''; else e = ':\n\n' + e;
    console.warn(`%c[Core]%c ${t}`, 'font-weight:bold;color:#0cc', '', e);
}

function error(e, t) {
    if (t === undefined) t = 'uncaught exception';
    console.error(`%c[Core]%c ${t}:\n\n`, 'font-weight:bold;color:#0cc', '', e);
}

module.exports = {

    // BUG: wrap and its sister function both fuck things up that use `this`
    //      i know exactly why this happens, but not the slightest clue how to fix it
    //      manual wrapping is necessary in some cases because of this
    //
    //      trying to use these on any function that uses `this` will fuck that function
    //      dont do it

    // intercept a function's arguments
    wrap: function (target1, callback) {

        // for security; we're evaluating an untrusted expression in the local scope here
        //var internal = {};

        // get the original function
        var orig = eval(target1);

        // the stub we will overwrite the function with
        function stub() {

            // what we will pass to the original function
            var args;

            try {
                // call the wrapper and get our args
                args = callback.apply(null, arguments);
            }
            catch (e) {
                error(e, 'A function wrapper threw an exception');

                // dont completely break the function if there's a flaw in the wrapper
                args = arguments;
            }

            // returning undefined results in the function call being suppressed
            if (typeof (args) != 'undefined') {
                // call the original function
                return orig.apply(null, args)
            }

        }

        stub.original = orig;
        stub.callback = callback;
        callback = callback.bind(stub);

        // do the overwriting thing
        eval(`${target1}=stub`);

    },

    // intercept a function's return value
    wrapAfter: function (target1, callback) {

        //var internal = {};

        // get the original function
        var orig = eval(target1);

        // the stub we will overwrite the function with
        function stub() {

            // call the original argument
            var r = orig.apply(null, arguments);

            try {
                // call the wrapper and return its return value
                return callback(r);
            }
            catch (e) {
                error(e, 'A function wrapper threw an exception');

                // again, dont fuck stuff up if there's a flaw in the wrapper
                return r;
            }

        }

        stub.original = orig;
        stub.callback = callback;
        callback = callback.bind(stub);

        // overwrite that shit
        eval(`${target1}=stub`);

    },

    // extended findFunc that automatically narrows down results
    findFuncExports: function (s, e) {
        if (s === undefined) throw Error('must provide a search string');
        if (e === undefined) e = s;
        var results = wc.findFunc(s).filter(x => x !== undefined && x.exports !== undefined && x.exports[e] !== undefined);
        if (results.length == 0)
            throw Error('findFuncExports() found no matches');
        if (results.length > 1)
            warn('findFuncExports() found more than one match');
        return results[0].exports;
    },

    findConstructor: function (s, e) {
        if (s === undefined) throw Error('must provide a search string');
        var results = e !== undefined ? wc.findFunc(s).filter(x => x !== undefined && x.exports !== undefined && x.exports[e] !== undefined) : wc.findFunc(s);
        if (results.length == 0)
            throw Error('findConstructor() found no matches');
        if (results.length > 1)
            warn('findConstructor() found more than one match');
        return mArr[results[0].i];
    }

}