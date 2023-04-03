/**
 * @name krakens2
 * @description my first plugin
 * @version 9.9.9
 * @author kraken 
 */
/*@cc_on
@else@*/
const config = {
    info: {
        name: "enables dev mode",
        authors: [
            {
                name: "kraken",
            }
        ],
        version: "9.9.9",
        description: "enables dev mode",
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
        // enable dev mode
        console.log("[krakens] triggered dev mode load");
          let wpRequire;
          window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
          let mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.Z?.isDeveloper !== "undefined");
          let usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
          let nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes)
          try {
              nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
          } catch (e) {}
          let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
          usermod.exports.default.__proto__.getCurrentUser = () => ({isStaff: () => true})
          nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
          usermod.exports.default.__proto__.getCurrentUser = oldGetUser
          console.log("[krakens] finished loading dev mode")
        }
        
        onStop() {
        // disable? dev mode
        console.log("[krakens] attempting to force disable dev mode");
        window.location.reload(false);
        }
    };
}
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
