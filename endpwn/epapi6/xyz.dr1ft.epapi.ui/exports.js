/*

    EPAPI6 UI API

    Copyright 2018 EndPwn Project
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    DO NOT EDIT THIS FILE! Your bootstrap may overwrite changes to it, and you will lose your work!
    EndPwn3 users: You can prevent this by creating a file in the same directory named DONTUPDATE
    
    https://github.com/endpwn/

*/

const util = mrequire('xyz.dr1ft.epapi.core');
const internal = mrequire('xyz.dr1ft.epapi.internal');

module.exports = {

    // navigate
    transitionTo: function (path) {
        wc.findCache('transitionTo')[0].exports.transitionTo(path);
    },

    // pull the channel id from the url
    // TODO: use internal functions to determine this
    getCurrentChannel: function () {
        var p = window.location.pathname.split('/');
        return p[p.length - 1];
    },

    // pull the guild id from the url
    // TODO: use internal functions to determine this
    getCurrentGuild: function () {
        var p = window.location.pathname.split('/');
        return p[p.length - 2];
    },

    // creates a fake message in the current channel (like clyde)
    fakeMsg: function (t, f) {
        var msg = internal.messageCreation.createMessage(this.getCurrentChannel(), t);
        msg.author.avatar = 'EndPwn'
        msg.author.bot = true;
        msg.author.discriminator = '0000';
        msg.author.id = '1';
        msg.author.username = 'EndPwn';
        msg.state = 'SENT';
        if (typeof (f) != 'undefined') {
            f(msg);
        }
        internal.messageUI.receiveMessage(this.getCurrentChannel(), msg);
    },

    // display a dialog box
    showDialog: function (x) { // for example, $api.ui.showDialog({title: 'Pwnt!', body: 'It works!'})
        util.findFuncExports('e.onConfirmSecondary', 'show').show(x);
    },

    // display a banner at the top of the app
    showNotice: function (text, button) {
        util.findFuncExports('ActionTypes.NOTICE_SHOW', 'show').show("GENERIC", text, button, () => { }, 0);
    },

    // get profile notes for a user
    getNote: function (id) {
        return util.findFuncExports('getNote', '_actionHandlers').getNote(id);
    }

}