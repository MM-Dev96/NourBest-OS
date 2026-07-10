import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const [html,css,js,sw,manifestText]=await Promise.all([
  readFile("index.html","utf8"),readFile("styles.css","utf8"),readFile("app.js","utf8"),readFile("sw.js","utf8"),readFile("manifest.webmanifest","utf8")
]);
const manifest=JSON.parse(manifestText);
for(const id of ["system","desktop","dock","launcher","window-layer","lock-screen","task-switcher","update-banner"]){assert.match(html,new RegExp(`id=["']${id}["']`),`missing #${id}`);}
assert.equal(manifest.display,"standalone");
assert.equal(manifest.dir,"rtl");
assert.equal(manifest.id,"./");
assert.ok(manifest.icons.some(icon=>icon.sizes==="512x512"));
assert.match(js,/function isEditable/);
assert.match(js,/if\(isEditable\(e\.target\)\)return/);
assert.match(sw,/nourbest-os-v2/);
for(const feature of ["bindFiles","renderTaskSwitcher","data-wallpaper","SKIP_WAITING","updateSearch"]){assert.ok(js.includes(feature),`missing feature ${feature}`);}
assert.ok(css.length>10000,"stylesheet unexpectedly small");
console.log("NourBest OS smoke checks passed");
