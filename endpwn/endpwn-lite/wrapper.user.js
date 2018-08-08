// ==UserScript==
// @name         EndPwn Lite Wrapper
// @namespace    https://endpwn.github.io/wrapper
// @version      1.1
// @description  Hello World
// @author       EndPwn Project
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

document.addEventListener('ep-ready', () => {

    var payload = () => {

        var exports = {};

        // Plugin code here

        exports.start();

    };

    // fix for greasemonkey/firefox; based on https://gist.github.com/nylen/6234717
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.appendChild(document.createTextNode('(' + payload + ')();'));
    var head = document.head || document.getElementsByTagName('head')[0];
    head.insertBefore(el, head.lastChild);

});