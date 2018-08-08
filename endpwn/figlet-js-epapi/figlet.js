/**
 * Figlet JS -- EPAPI port
 * 
 * Copyright (c) 2010 Scott González
 * Licensed under MIT
 * 
 * http://github.com/scottgonzalez/figlet-js
 */

(function () {

	var Figlet = exports = {
		fonts: {},

		parseFont: function (name) {
			if (name in Figlet.fonts) {
				return;
			}

			Figlet._parseFont(name, Figlet.loadFont(name));
		},

		_parseFont: function (name, defn) {
			var lines = defn.split("\n"),
				header = lines[0].split(" "),
				hardblank = header[0].charAt(header[0].length - 1),
				height = +header[1],
				comments = +header[5];

			Figlet.fonts[name] = {
				defn: lines.slice(comments + 1),
				hardblank: hardblank,
				height: height,
				char: {}
			};
			return;
		},

		parseChar: function (char, font) {
			var fontDefn = Figlet.fonts[font];
			if (char in fontDefn.char) {
				return fontDefn.char[char];
			}

			var height = fontDefn.height,
				start = (char - 32) * height,
				charDefn = [],
				i;
			for (i = 0; i < height; i++) {
				charDefn[i] = fontDefn.defn[start + i]
					.replace(/@/g, "")
					.replace(RegExp("\\" + fontDefn.hardblank, "g"), " ");
			}
			return fontDefn.char[char] = charDefn;
		},

		write: function (str, font) {
			if (font === undefined) font = 'standard';

			Figlet.parseFont(font);

			var chars = [],
				result = "";
			for (var i = 0, len = str.length; i < len; i++) {
				chars[i] = Figlet.parseChar(str.charCodeAt(i), font);
			}
			for (i = 0, height = chars[0].length; i < height; i++) {
				for (var j = 0; j < len; j++) {
					result += chars[j][i];
				}
				result += "\n";
			}

			return result;
		},

		loadFont: function (name, fn) {
			return require("fs").readFileSync($api.data + "/fonts/" + name + ".flf", "utf-8");
		}
	};

})();