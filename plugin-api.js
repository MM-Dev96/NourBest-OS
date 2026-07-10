"use strict";
(function(){
  const apps=[],commands=new Map();
  function registerApp(definition){if(!definition?.id||!definition?.name||typeof definition.render!=="function")throw new TypeError("Invalid NourBest app plugin");if(apps.some(app=>app.id===definition.id))throw new Error(`Duplicate app: ${definition.id}`);apps.push({...definition,icon:definition.icon||"◇",color:definition.color||"#687cff"});}
  function registerCommand(name,handler,description=""){if(typeof handler!=="function")throw new TypeError("Command handler must be a function");commands.set(name,{handler,description});}
  window.NourPlugins={apps,commands,registerApp,registerCommand,version:1};
})();
