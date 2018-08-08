# crxpwn
Proof-of-concept for injecting preload scripts without patching core.asar.

Currently only works on Discord Canary, will likely work on stable in the near future.

## How to use
1. Make a folder in `$api.data` called `crxpwn`
2. Place manifest.json in that folder
3. Create a file named payload.js that contains your desired payload
4. Run `electron.BrowserWindow.addExtension($api.data+'crxpwn')` in the console
5. Ctrl+R
6. ???
7. Profit

## Why?
asarpwn works well enough, but here at the EndPwn Project it's our mission to gain total control over the Discord app without modifying any of its files (other than configuration stuff of course).