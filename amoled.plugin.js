/**
 * @name krakens
 * @description enables amoled theme
 * @version 9.9.9
 * @author kraken 
 */
/*@cc_on
@else@*/
const config = {
    info: {
        name: "amoled theme",
        authors: [
            {
                name: "kraken",
            }
        ],
        version: "9.9.9",
        description: "enables amoled theme",
    },
    changelog: [
        {
            title: "Fixes",
            type: "fixed",
            items: [
                "Fixed for Discord changes"
            ]
        }
    ],
    main: "index.js",
};
class Dummy {
    constructor() {this._config = config;}
    start() {}
    stop() {}
}
if (!global.ZeresPluginLibrary) {
   BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.name ?? config.info.name} is missing. Please click Download Now to install it.`, {
       confirmText: "Download Now",
       cancelText: "Cancel",
       onConfirm: () => {
           require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
               if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
               if (resp.statusCode === 302) {
                   require("request").get(resp.headers.location, async (error, response, content) => {
                       if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                       await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                   });
               }
               else {
                   await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
               }
           });
       }
   });
}
module.exports = !global.ZeresPluginLibrary ? Dummy : (([Plugin, Api]) => {
     const plugin = (Plugin, Api) => {

    return class DoNotTrack extends Plugin {
        onStart() {
        // enable amoled
    	  document.body.classList.add("theme-amoled"); 
        console.log("[krakens] enabled amoled");
        }
        
        onStop() {
        //disable amoled
  		  document.body.classList.remove("theme-amoled"); 
        console.log("[krakens] disabled amoled mode");
        }
    };
}
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
