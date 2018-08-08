/*

    EndPwn Lite Stage 2
    Based on the EndPwn Reference Bootstrap

    Copyright 2018 EndPwn Project

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    https://github.com/endpwn/

*/

(() => {

    // add windows.reload()
    window.reload = () => location.reload();

    function __epprint(str) {
        console.log(`%c[EndPwn]%c ` + str, 'font-weight:bold;color:#0cc', '');
    }

    // define this with a default value as a fallback
    var __goodies = {
        guilds: [],
        bots: [],
        users: {}
    };

    function fetchGoodies() {
        // fetch goodies.json
        __epprint('fetching endpwn cutomizer data from server...');
        fetch('https://endpwn.cathoderay.tube/goodies.json?_=' + Date.now())
            .then(x => x.json())
            .then(r => __goodies = r);
    }

    // Fetch goodies now and every half hour
    fetchGoodies();
    setInterval(fetchGoodies, 1800000);

    // early init payload
    document.addEventListener('ep-prepared', () => {

        // disable that obnoxious warning about not pasting shit in the console
        __epprint('disabling self xss warning...');
        $api.util.findFuncExports('consoleWarning').consoleWarning = e => { };

        // fuck sentry
        __epprint('fucking sentry...');
        var sentry = wc.findCache('_originalConsoleMethods')[0].exports;
        window.console = Object.assign(window.console, sentry._originalConsoleMethods); // console
        sentry._wrappedBuiltIns.forEach(x => x[0][x[1]] = x[2]); // other stuff
        sentry._breadcrumbEventHandler = () => () => { }; // break most event logging
        sentry.captureBreadcrumb = () => { }; // disable breadcrumb logging

        // fetch the changelog
        __epprint('injecting changelog...');
        fetch('https://endpwn.cynfoxwell.cf/changelog.md?_=' + Date.now()).then(r => r.text()).then(l => {

            // we're racing discord's initialization procedures; try and hit a timing sweetspot
            setTimeout(function () {

                try {

                    // get the changelog object
                    var log = $api.util.findFuncExports('changeLog');
                    var data = l.split(';;');

                    // set the date
                    if (log.changeLog.date <= data[0])
                        log.changeLog.date = data[0];

                    // prepend to the changelog body
                    log.changeLog.body = data[1] + '\n\n' + log.changeLog.body;

                }
                catch (e) {

                    // it failed, try again in 10 ms
                    setTimeout(arguments.callee, 100);

                }

            }, 100);

        });

    });

    // post-init payload
    document.addEventListener('ep-ready', () => {

        // disable analytics
        __epprint('disabling analytics...');
        $api.util.findFuncExports("AnalyticEventConfigs").default.track = () => { };

        // enable experiments
        __epprint('enabling experiments menu...');
        $api.util.findFuncExports('isDeveloper').__defineGetter__('isDeveloper', () => true);

        // apply custom discrims/bot tags/badges/server verif from EndPwn Customizer (endpwn.cathoderay.tube)
        __epprint('initializing endpwn cutomizer...');

        // add the endpwn dev badge to the class obfuscation table
        wc.findFunc('profileBadges:"profileBadges')[0].exports['profileBadgeEndpwn'] = 'profileBadgeEndPwn';

        // apply the css for endpwn dev badges
        var badgecss = document.createElement("style");
        badgecss.type = "text/css";
        badgecss.innerHTML = ".profileBadgeEndPwn{background-image:url(https://dr1ft.xyz/sigma_solid.svg);background-position:center;background-repeat:no-repeat;width:16px;height:16px}";
        document.body.appendChild(badgecss);

        // hook getUser() so we can apply custom discrims/bot tags/badges
        $api.util.wrapAfter(
            "wc.findCache('getUser')[0].exports.getUser",

            x => {

                if (x === undefined || x === null) return;

                if (__goodies.bots.includes(x.id)) x.bot = true;
                if (__goodies.users[x.id] !== undefined) x.discriminator = __goodies.users[x.id];
                if (__goodies.devs.includes(x.id)) x.flags += x.flags & 4096 ? 0 : 4096;

                return x;
            }
        );

        // hook getGuild() so we can verify servers
        $api.util.wrapAfter(
            "wc.findCache('getGuild')[0].exports.getGuild",

            x => {

                if (x === undefined || x === null) return;

                if (__goodies.guilds.includes(x.id)) x.features.add('VERIFIED');

                return x;
            }
        );

        // check for epapi updates
        if ($api.lite || !fs.existsSync($api.data + '/DONTUPDATE'))
            (function () {

                __epprint('checking for EPAPI updates...');

                // fetch the latest build of epapi
                fetch('https://endpwn.cynfoxwell.cf/epapi/epapi.js?_=' + Date.now()).then(x => x.text()).then(x => {

                    // check the version
                    if (kparse(x).version > $api.version) {

                        // if the version on the server is newer, pester the user
                        $api.ui.showDialog({

                            title: 'EndPwn3: EPAPI Update Available',
                            body: 'An update to EPAPI has been released. It is recommended that you restart your client in order to gain access to new features and maintain compatibility.',
                            confirmText: 'Restart Now', cancelText: 'Later',

                            // user pressed "Restart Now"
                            onConfirm: () => {

                                // refresh the page if we're running in a browser, reboot the app if we're running outside of lite mode
                                reload();

                            },

                            // they pressed "Later", for some reason
                            onCancel: () => {

                                // bother them again in 6 hrs (* 60 min * 60 sec * 1000 ms)
                                setTimeout(arguments.callee, 6 * 60 * 60 * 1000);

                            }

                        });

                    }
                    else setTimeout(arguments.callee, 6 * 60 * 60 * 1000);

                });

            })();

    });

    /*
    // load CRISPR
    fetch('https://endpwn.cynfoxwell.cf/crispr/crispr.js?_=' + Date.now())
        .then(x => x.text())
        .then(crispr => {
            eval('(()=>{var exports={};' + crispr + ';return exports})()').go();;
        });
    */

    // load EPAPI
    fetch('https://endpwn.cynfoxwell.cf/epapi/epapi.js?_=' + Date.now())
        .then(x => x.text())
        .then(epapi => {
            eval('(()=>{var exports={};' + epapi + ';return exports})()').go('lite', 0, 1, 1);;
        });

})();
