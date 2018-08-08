/*

    EPAPI6 Events API

    Copyright 2018 EndPwn Project
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    DO NOT EDIT THIS FILE! Your bootstrap may overwrite changes to it, and you will lose your work!
    EndPwn3 users: You can prevent this by creating a file in the same directory named DONTUPDATE
    
    https://github.com/endpwn/

*/

const common = require('./common.js');
const internal = mrequire('xyz.dr1ft.epapi.internal');

module.exports = function () {

    common.print('hooking Discord event handler...');
    window.__logAllInternalEvents = false;
    internal.dispatcher.default.dispatch_original = internal.dispatcher.default.dispatch;
    internal.dispatcher.default.dispatch = function (e) {
        if (window.__logAllInternalEvents) console.log(e.type + '\n', e);
        common.hooks.filter(x => x.type == e.type).forEach(x => x.callback(e));
        return internal.dispatcher.default.dispatch_original(e);
    }

}