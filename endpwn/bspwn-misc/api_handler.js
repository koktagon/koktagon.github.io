/*
    this file is basically a fragment of an express server
    it is intended to handle everything from /api/*
*/

var fetch = require('node-fetch');

var r = await fetch('https://discordapp.com' + request.originalUrl);
var j = await r.json();

if (j.discord_desktop_core) j.discord_desktop_core += 7;

response.type('application/json');

return JSON.stringify(j);