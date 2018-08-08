// ==UserScript==
// @name         EndPwn Lite
// @namespace    https://endpwn.github.io/
// @version      1.3
// @description  EndPwn for web browsers
// @author       EndPwn Project
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

/*

    EndPwn Lite Stage 1

    Copyright 2018 EndPwn Project

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    https://github.com/endpwn/

*/

fetch('https://endpwn.github.io/endpwnlite/stage2.js?_=' + Date.now()).then(r => r.text()).then(stage2 => {

    // fix for greasemonkey/firefox; based on https://gist.github.com/nylen/6234717
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.appendChild(document.createTextNode(stage2));
    var head = document.head || document.getElementsByTagName('head')[0];
    head.insertBefore(el, head.lastChild);

});